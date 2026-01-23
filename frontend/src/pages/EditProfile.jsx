import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photo) formData.append("photoUrl", photo);

      const res = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:22px_22px]" />

     
      <header className="fixed w-full top-0 z-30 bg-[#0b0f19]/80 backdrop-blur border-b border-white/10 ">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="text-white/60 hover:text-white transition"
          >
            <FaArrowLeftLong size={18} />
          </button>
          <span className="text-xs uppercase tracking-widest text-white/40">
            Edit Profile
          </span>
        </div>
      </header>

     
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-[320px_1fr] gap-12"
      >
       {/* left */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
            
<div className="flex items-center gap-4">

  {/* Avatar */}
  <div className="w-16 h-16 rounded-full border border-white/30 overflow-hidden flex items-center justify-center bg-white/10 shrink-0">
    {photo || userData?.photoUrl ? (
     <img
  src={
    photo
      ? URL.createObjectURL(photo)
      : `${userData.photoUrl}?t=${Date.now()}`
  }
  alt="avatar"
  className="w-full h-full object-cover"
/>



    ) : (
      <span className="text-lg font-semibold text-white">
        {(name || userData?.name || "U").charAt(0).toUpperCase()}
      </span>
    )}
  </div>

  <div className="min-w-0">
    <div className="text-base font-medium truncate">
      {name || "Your name"}
    </div>
    <div className="text-xs uppercase tracking-widest text-white/40 mt-1">
      {userData?.role}
    </div>
  </div>

</div>



            <div className="text-sm text-white/60 leading-relaxed">
              {description?.trim()
                ? description
                : "Your bio will appear here. Keep it concise and authentic."}
            </div>

            <label className="block text-xs text-white/40">
              Change avatar
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="mt-2 block w-full text-sm
                file:mr-3 file:px-4 file:py-2
                file:rounded-full file:border-0
                file:bg-white file:text-black
                hover:file:bg-gray-200"
              />
            </label>
          </div>
        </aside>

        {/* RIGHT  */}
        <section className="space-y-10">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              Display name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-white/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              Email
            </label>
            <div className="px-4 py-3 rounded-xl border border-white/10 text-white/60 text-sm">
              {userData?.email}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              Bio
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you learning? What do you teach?"
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-base resize-none focus:outline-none focus:border-white/40 transition"
            />
          </div>

        
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 rounded-xl bg-white text-black font-medium hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? <ClipLoader size={20} /> : "Save changes"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditProfile;
