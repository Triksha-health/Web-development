import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { File, X } from "lucide-react";

const ApplyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobRole: "",
    stipend: "",
    startDate: "",
    coverLetter: "",
    resume: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Application Submitted Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafc] p-6 pt-24">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <X size={28} />
        </button>

        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Job Application Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            name="jobRole"
            required
            value={formData.jobRole}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600"
          >
            <option value="">Select Job Position</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Other">Other</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="stipend"
              placeholder="Expected Stipend (₹/month)"
              required
              value={formData.stipend}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <textarea
            name="coverLetter"
            placeholder="Why do you want to join us? (Cover Letter)"
            required
            rows={4}
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>

         
          <div className="space-y-2">
  <label className="block text-gray-700 font-medium">Upload Your Resume (PDF Only)</label>

  <div className="flex items-center w-full border border-gray-300 rounded-xl p-3 bg-gray-50 hover:shadow-md transition-all">
    <File className="w-6 h-6 text-primary-500 mr-3" />

    <span className="flex-1 text-gray-600 truncate">
      {formData.resume ? formData.resume.name : "No file selected"}
    </span>

    <label
      htmlFor="resume"
      className="cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-all text-sm"
    >
      Select File
      <input
        id="resume"
        type="file"
        accept=".pdf"
        required
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  </div>

  <span className="text-gray-400 text-sm mt-1">Only PDF files (Max: 5MB)</span>
</div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-105 hover:bg-primary-600 transition-transform"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
