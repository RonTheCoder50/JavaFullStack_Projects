import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { apiCall, userProfileAPI } from "./API";


export default function ProfileCard() {

  const [data, setData] = useState({});
  const [blogListData, setBlogListData] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const theme = localStorage.getItem('theme');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

    useEffect(() => {  
        async function fetchProfile() {
            const profileData = await userProfileAPI(token);
            setData(profileData);
            console.log(profileData);  
        }

        fetchProfile();
    }, [token]);

    useEffect(() => {
      //fetch data via api
      async function fetchData() {
        const data = await apiCall();
        setBlogListData(data);
      }

      fetchData();
    }, []);

    useEffect(() => {
      function countLikes() {
        let likes = 0;
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        for(let blog of blogListData) {
          if(blog?.user?.id === userId) {
            likes += Number(blog.likes.length);
          }
        }

        setTotalLikes(likes);
      }

      countLikes();
    }, [totalLikes, blogListData]);

  return (
    <section className={`
      w-full
      min-h-screen 
      flex 
      justify-center 
      items-start 
      bg-gray-800
      ${theme === 'dark' ? 'bg-gray-800 text-white/95' : 'bg-white text-gray-800'}
    `}> 

    
    <div className={`
      w-full
      max-w-md 
      border shadow-lg 
      rounded-2xl 
      p-6 mt-20
      h-auto
    `}>

      <Button
        className={'absolute top-10 left-10 bg-gray-700 text-white/90'} 
        onClick={() => navigate('/dashboard')}
      >
          Go Back
      </Button>
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${theme === 'dark' ? 'text-white bg-gray-400' : 'text-black bg-gray-200'}`}>
          {name.charAt(0)}
        </div>
        <div>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>
            {data?.username}
          </h2>
          <p className="text-sm text-gray-300">Joined: {
            data ? data?.joinDate : '01-01-2026'
          }</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center mt-6">
        <Box count={data ? data.posts?.length : 0} text1={'Posts'} text2={'View'}/>
        <Box count={data ? data.bookmarks?.length : 0} text1={'Bookmarks'} text2={'View'}/>
        <Box count={totalLikes} text1={'Likes'} text2={'Total gained'}/>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-black text-white py-2 rounded-xl hover:bg-gray-700 transition">
          See Posts
        </button>
        <button className={`
          flex-1 
          border py-2  
          rounded-xl 
          transition
          ${theme === 'dark' ? 'hover:bg-gray-500' : 'hover:bg-gray-100'}
        `}>
          See Bookmarks
        </button>
      </div>
    </div>
    </section>
  );
}

function Box({ count, text1, text2 }) {
    const theme = localStorage.getItem('theme');
    return (
      <div className={`
        p-3 
        rounded-xl 
        ${theme === 'dark' ? 'bg-gray-600 text-white/80' : 'bg-gray-50 text-gray-800'}
      `}>
          <p className="text-lg font-bold">{count}</p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>
            {text1}
          </p>
          <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-sky-400' : 'text-gray-400'}`}>
            {text2}
          </p>
      </div>
    )
} 