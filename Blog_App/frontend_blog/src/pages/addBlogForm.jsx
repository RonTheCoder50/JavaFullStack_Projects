import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router";

import axios from "axios";

export default function AddBlogForm() {
  const theme = localStorage.getItem('theme');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    user: {}
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const newForm = {
      ...form,
      author: user.username,
      uid: user.id
    };

    console.log("Blog Data:", newForm);

    // 👉 call API here
    const api = await axios.post(`http://localhost:8080/post/add`, newForm);
    console.log("blog uploaded successfully: ", api.data);

    setForm({
      title: "",
      content: "",
      author: "",
      user: {}
    });

    navigate('/dashboard');    
  }

  return (
    <div className={`
      min-h-screen flex 
      items-center p-4 
      justify-center 
      ${theme === 'dark' 
        ? 'bg-gray-900 text-white/90' 
        : 'bg-gray-100'
      }
    `}>

      <Button 
        onClick={() => navigate('/dashboard')}
        className='absolute top-10 left-10 px-4 py-0.5 bg-red-500'
      >
        back
      </Button>

      <Card className={`
        w-full max-w-2xl 
        shadow-xl rounded-2xl
        ${theme === 'dark' 
          ? 'bg-gray-700 text-white' 
          : 'bg-white text-black/90'
        }
      `}>

        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-wide text-center">
            ✍️ Create New Blog
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium mb-1 ml-0.5">
                Blog Title
              </label>
              <Input
                name="title"
                placeholder="Enter blog title..."
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium mb-1 ml-0.5">
                Description
              </label>
              <Textarea
                name="content"
                placeholder="Write your blog content..."
                value={form.content}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>

            {/* Button */}
            <Button onClick={() => setLoading(true)} className="w-full text-base">
              {loading === true ? 'Publishing...' : '🚀 Publish Blog'}
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  );
}