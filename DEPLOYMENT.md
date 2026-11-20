# Deployment

How the Triksha project gets online, and how to repair it when it breaks.

## What goes where

| Part | Folder | Hosted on | How it gets there |
|---|---|---|---|
| Website (what visitors see) | `frontend/` | Netlify, at trikshahealth.com | Netlify rebuilds by itself when `main` changes |
| Backend (saves waitlist emails, accounts, orders) | `backend/` | Azure Web App `triksha-backend` | GitHub Actions workflow, see below |

Rule: the Azure app `triksha-backend` must only ever receive the `backend` folder. Never deploy the whole repository to it.

There is a second Azure Web App called `Triksha` (App Service plan `ASP-Web-a6a0`). It is a leftover and is not used by this project. Nothing in this repository deploys to it, and the domain does not point to it.

## The website (Netlify)

- The domain trikshahealth.com is served by Netlify. `www.trikshahealth.com` redirects to it.
- Netlify is connected to this GitHub repository and rebuilds the site after every merge into `main`. There is no GitHub Actions workflow for the website.
- The build settings that live in the repository are in `frontend/netlify.toml`:
  - build command: `npm run build`
  - published folder: `dist`
  - requests to `/api/*` are passed on to the `triksha-backend` Azure app
  - every page that is not prerendered falls back to `app.html`

Some settings are kept only in the Netlify dashboard, not in this repository. If the Netlify site is ever set up again from scratch, these must be entered by hand. Fill these in from the dashboard (Site configuration) so they are on record:

- Netlify site name: _to fill in_
- Branch that Netlify builds: `main` (confirm in the dashboard)
- Base directory: `frontend` (confirm in the dashboard)
- Environment variable `VITE_API_URL`: the address of the backend, with no slash at the end. See `frontend/.env.example` for the expected form. Never write real secret values in this file.

## The backend (Azure)

- Workflow file: `.github/workflows/main_triksha-backend.yml`
- Azure Web App: `triksha-backend`, resource group `backend`, subscription `Pay-As-You-Go`, Node 20 LTS
- When it runs: on a push to `main` that changes something inside `backend/` or the workflow file itself, and by hand from the GitHub Actions page ("Run workflow"). Website-only changes do not trigger it.
- What it does: goes into `backend`, installs, builds and tests, zips only the contents of `backend` into `release.zip`, signs in to Azure, and deploys that zip.

The sign-in step uses three repository secrets (names only; the values live in GitHub, under Settings, Secrets and variables, Actions):

- `AZUREAPPSERVICE_CLIENTID_1B58ACB2BE4E42A4ACF7A58C7F8DF68A`
- `AZUREAPPSERVICE_TENANTID_8FB23EAEF5C846EDA58D741B4B5B3E9D`
- `AZUREAPPSERVICE_SUBSCRIPTIONID_8776D23FDF5D4B8FAD05DA7190F92BD8`

Three older secrets, ending in `15860E47...`, `3F02F832...` and `8D908E81...`, are no longer used and can be deleted.

Do not change the workflow file, the secret names, or the backend-only build and zip steps without a reason. They are easy to break.

## If the backend deploy fails at "Login to Azure"

This happened in November 2026.

**What it looked like.** The `deploy` job failed at the "Login to Azure" step with `No subscriptions found` and `Login failed with Error: The process '/usr/bin/az' failed with exit code 1`. The `build` job was green. Runs #67, #68 and #69 failed this way. The last good deploy before that was run #66 on 14 February 2026.

**Why.** The Azure identity that the GitHub secrets pointed to no longer existed in the Azure account. GitHub could sign in, but that identity had no access to any subscription.

**How it was fixed.**

1. Disable the workflow on GitHub for the moment (Actions, select the workflow, "Disable workflow").
2. In the Azure portal, open `triksha-backend`, then Deployment Center. Disconnect GitHub, then connect it again: repository `Triksha-health/Web-development`, branch `main`, Node 20 LTS, with a new user-assigned managed identity. Azure creates the identity, gives it access, and adds three new secrets to the GitHub repository.
3. Azure also writes its own workflow file at this point, and that file deploys the whole repository. Do not keep it. Put `main_triksha-backend.yml` back to the backend-only version, and change only the three secret names in the "Login to Azure" step to the new ones Azure created.
4. Enable the workflow again and run it by hand. Run #70 succeeded this way.

**Before doing all that, check the simple things first.** In the Azure portal, open Subscriptions and confirm the subscription is Active. An expired or disabled subscription gives the same error.

## Checking that a deploy worked

- Website: open trikshahealth.com and hard refresh (Ctrl+Shift+R). In the Netlify dashboard, the latest deploy should say "Published".
- Backend: on GitHub, open Actions and check that the latest "Build and deploy Node.js app to Azure Web App - triksha-backend" run is green. Then submit the waitlist form on the site with a test email and confirm it is saved.
