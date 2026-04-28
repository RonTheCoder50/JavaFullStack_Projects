import { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";


import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { getPostAPI, likeAPI, postCommentAPI, bookmarkAPI, deleteBlogAPI } from "./API";


export default function BlogPage_Card() {
    const user_data = JSON.parse(localStorage.getItem('user'));
    const user_id = user_data.id;
    const theme = localStorage.getItem('theme');

    const [toggleCommentSection, setToggleCommentSection] = useState(false);
    const [addCommentActive, setAddCommentActive] = useState(false);
    const [blogData, setBlogData] = useState(null);
    const [toggleBookMark, setToggleBookMark] = useState(false);
    const [commentData, setCommentData] = useState('');

    const [toggleUpdateBlog, setToggleUpdateBlog] = useState(false);
    const [updateBlogData, setUpdateBlogData] = useState({
        title: '',
        content: ''
    });
    
    const navigate = useNavigate();
    const { id } = useParams();
    const currentPostOwner = user_id === blogData?.user?.id;
    const token = localStorage.getItem('token');

    const isLiked = blogData?.likes?.some(
        (like) => like?.user?.id === user_id
    );

    async function LikeAPI() {
        try {
            const post_id = blogData.id;
            const data = await likeAPI(post_id, user_id); //like api call (like / dislike)

            if(data === 'liked') {
                setBlogData(prev => ({
                    ...prev,
                    likes: [...prev.likes, { user: { id: user_id } }]
                }));
            } else {
                setBlogData(prev => ({
                    ...prev,
                    likes: prev.likes.filter(
                        (like) => like?.user?.id !== user_id
                    )
                }));
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function CommentAPI() {
        
        const commentObj = {
            comment: commentData,
            userId: user_id,
            postId: blogData.id
        }

        if(commentObj.comment.trim().length === 0) {
            alert('comment is empty!');
            return;
        }

        const postComment = await postCommentAPI(token, commentObj); //api call (add comment api)
        const updatePostData = await getPostAPI(blogData.id, token); //api call (get post data)

        setBlogData(updatePostData); //now comment auto-update without page refresh!
        console.log("api response: ", postComment.data);

        setAddCommentActive(false);
        setCommentData('');
    }

    async function BookMarkAPI() {
        const data = await bookmarkAPI(blogData.id, user_id, token);
        console.log(data);

        const isBook = data.trim();
        setToggleBookMark(isBook === 'saved' ? true : false);
    }

    async function DeleteAPI() {
        const deleteAPI = await deleteBlogAPI(id, user_id, token);
        console.log(deleteAPI);
        navigate('/dashboard');
    }

    async function UpdateAPI() {
        const data = {
            postId: id,
            title: updateBlogData.title,
            content: updateBlogData.content,
            userId: user_id
        }
        
        const updatePostAPIData = await updateBlogData(data, token);
        console.log(updatePostAPIData);

        //toggle form
        setToggleUpdateBlog(false);
        setBlogData(updatePostAPIData);
    }

    function handleComment(e) {
        setCommentData(
            e.target.value
        );
    }

    useEffect(() => {
        async function apiCall() {
            const api = await axios.get(`http://localhost:8080/post/${id}`,
                {headers: {
                    authorization: `Bearer ${token}`
                }}
            );
            setBlogData(api.data);

            console.log(api.data);
        }

        apiCall();
    }, [id, token]);

    useEffect(() => {
        async function apiBookMarkExistCall() {
            const api = await axios.post(
                `http://localhost:8080/post/bookmark/exist/${id}/${user_id}`,
                {headers: {
                    authorization: `Bearer ${token}`
                }}
            );

            if(api.data) {
                setToggleBookMark(true);
            } else {
                setToggleBookMark(false);
            }
        }

        apiBookMarkExistCall();
    }, [toggleBookMark, id, user_id, token]);

    useEffect(() => {
        function update() {
            if (blogData?.title && blogData?.content) {
                setUpdateBlogData({
                    title: blogData.title,
                    content: blogData.content
                });
            }
        }

        update();
    }, [blogData]);

    return (
        <section className={`
            w-full min-h-screen 
            flex flex-col gap-3 
            justify-center items-center
            ${theme === 'dark' 
                ? 'bg-gray-800 text-white/90' 
                : 'bg-white'
            }
        `}>
            <Button
                onClick={() => navigate('/dashboard')}
                className="absolute top-10 left-10 bg-red-500 py-1 px-4 hover:scale-103"
            >
                Back
            </Button>

            {toggleUpdateBlog  &&
                <div className={`
                    max-w-md 
                    w-full 
                    rounded-2xl 
                    shadow-md hover:shadow-xl 
                    transition duration-300 p-5
                    border flex flex-col 
                    gap-4 text-sm
                    ${theme === 'dark'
                        ? 'bg-gray-900 text-white/90 border-gray-400' 
                        : 'bg-white border-gray-500'
                    }
                `}>
                    <h2 className="text-center border-b border-gray-300 p-2 text-lg font-medium tracking-wide">
                        blog update form
                    </h2>

                    <div className="flex flex-col gap-1">
                        <p>Title</p>
                        <Input 
                            id="title"
                            type="text"
                            value={updateBlogData?.title}
                            onSmash={(e) =>
                                setUpdateBlogData({
                                    ...updateBlogData,
                                    title: e.target.value
                                })
                            }
                            placeholder="enter blog title..."
                            required
                        /> 
                    </div>

                    <div className="flex flex-col gap-1">
                        <p>Content</p>
                        <Textarea
                                name="content"
                                placeholder="Write your blog content here..."
                                value={updateBlogData?.content}
                                onChange={(e) =>
                                    setUpdateBlogData({
                                        ...updateBlogData,
                                        content: e.target.value
                                    })
                                }
                                rows={6}
                                required
                            />
                    </div>

                    <div className="flex justify-center items-center gap-6 mt-4"> 
                        <Button
                            onClick={() => UpdateAPI()}
                            className='bg-green-500 px-4.5'
                        >
                            save 
                        </Button>

                        <Button 
                            onClick={() => 
                                setToggleUpdateBlog(false)
                            }
                            className='bg-red-500 px-3'>
                            cancel
                        </Button>
                    </div>
                </div>
            }

            {!toggleUpdateBlog && 
                <div className={`
                    max-w-md 
                    w-full 
                    rounded-2xl 
                    shadow-md hover:shadow-xl 
                    transition duration-300 p-5
                    border flex flex-col 
                    gap-4 text-sm
                    ${theme === 'dark'
                        ? 'bg-gray-900 text-white/90 border-gray-500' 
                        : 'bg-white border-gray-500'
                    }
                `}>
                    {/* Title */}
                    <h2 className={`text-xl 
                        font-semibold mb-2 
                        hover:text-blue-600
                         cursor-pointer 
                         transition 
                        ${theme === 'dark' 
                            ? 'text-gray-400' 
                            : 'text-gray-800'
                        }
                    `}>
                        {blogData ? blogData.title : 'How to Build Secure Spring Boot APIs'}
                    </h2>

                    {/* Description */}
                    <p className={`
                        text-sm mb-4 
                        line-clamp-3
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                        {blogData
                            ? blogData.content
                            : 'Learn how to implement authentication and authorization using Spring Security'
                            + 'and JWT. This guide covers best practices for building scalable backend systems.'
                        }
                    </p>

                    {/* Author + Dates */}
                    <div className="text-xs text-gray-500 mb-4 flex flex-col gap-1">
                        <span>
                            ✍️ Author:
                            {blogData
                                ? ' ' + blogData.author
                                : ' Rohan'
                            }

                        </span>
                        <span>📅 Created:
                            {blogData
                                ? ' ' + blogData?.createdAt?.split('T')[0]
                                : 'undefined'
                            }
                        </span>
                        <span>
                            🔄 Updated:
                            {blogData
                                ? ' ' + blogData.updatedAt?.split('T')[0]
                                : 'undefined'
                            }
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t pt-3 text-gray-600">
                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => {
                                    LikeAPI();
                                }}
                                className="flex items-center gap-1 text-red-500 transition">
                                {isLiked === true
                                    ? <IoIosHeart size={18} />
                                    : <IoIosHeartEmpty size={18} />
                                }
                                <span className={`
                                    text-sm   
                                    ${theme === 'dark' 
                                        ? 'text-gray-200'
                                        : 'text-black/80'
                                    }
                                `}>
                                    {isLiked === true ? 'liked' : 'like'}
                                </span>
                            </button>

                            <button
                                onClick={() => setToggleCommentSection(!toggleCommentSection)}
                                className="flex items-center gap-1 hover:text-blue-500 transition">
                                <FaRegCommentDots size={18} />
                                <span className={`
                                    text-sm 
                                    ${theme === 'dark'
                                        ? 'text-white/80'
                                        : 'text-gray-600'
                                    }
                                `}>
                                    {toggleCommentSection === true
                                        ? 'close' : 'comments'}
                                </span>
                            </button>
                        </div>
                                    
                        { currentPostOwner !== true 
                        
                        ?  <button
                                onClick={() => {
                                    setToggleBookMark(!toggleBookMark);
                                    BookMarkAPI();
                                }}
                                className="text-yellow-500 transition">
                                {toggleBookMark === true
                                    ? <IoBookmark size={22} />
                                    : <IoBookmarkOutline size={22} />
                                }
                            </button> 
                                    
                        :   <div className="flex items-center gap-2 text-sm">
                                <Button
                                    onClick={() => setToggleUpdateBlog(true)} 
                                    className='bg-indigo-500'
                                >
                                    edit
                                </Button>
                                
                                <Button
                                    onClick={() => DeleteAPI()}
                                    className='bg-red-500'
                                >
                                    delete
                                </Button>

                                <button
                                    onClick={() => {
                                        setToggleBookMark(!toggleBookMark);
                                        BookMarkAPI();
                                    }}
                                    className="text-yellow-500 transition">
                                    {toggleBookMark === true
                                        ? <IoBookmark size={22} />
                                        : <IoBookmarkOutline size={22} />
                                    }
                                </button>
                            </div>
                        }
                    </div>

                </div>
            }

            {toggleCommentSection &&
                <ul className={`
                    w-full max-w-[90%] 
                    sm:max-w-[450px] 
                    flex flex-col gap-2 p-2
                    rounded-md shadow-md 
                    hover:shadow-md/30 
                    transition duration-300 
                    borderh-full max-h-[300px]
                    overflow-auto
                    ${theme === 'dark' 
                        ? 'bg-gray-900 border-gray-500'
                        : 'bg-white border-gray-100'
                    }
                `}>

                    {addCommentActive !== true
                        ?
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg tracking-wide font-medium p-1">
                                Comments
                            </h2>

                            <Button
                                onClick={() => setAddCommentActive(true)}
                                className="text-sm p-0 px-4 py-1 tracking-normal bg-sky-500">
                                + add
                            </Button>
                        </div>
                        :
                        <div className="flex justify-between items-start gap-2">
                            <Textarea
                                name="content"
                                placeholder="Write your comment here..."
                                value={commentData}
                                onChange={handleComment}
                                rows={6}
                                required
                            />

                            <div className="flex flex-col items-center gap-1">
                                <Button
                                    onClick={() => CommentAPI()}
                                    className="text-sm p-0 px-3 py-0.5 tracking-normal bg-indigo-500">
                                    post
                                </Button>

                                <Button
                                    onClick={() => setAddCommentActive(false)}
                                    className="text-sm p-0 px-2 py-0.5 tracking-normal bg-red-500">
                                    close
                                </Button>
                            </div>
                        </div>
                    }

                    <hr />

                    {blogData?.comments?.map(com => (
                        <li key={com.id}
                            className={`
                                shadow-sm border 
                                w-full p-2 flex 
                                flex-col gap-3
                                ${theme === 'dark'
                                    ? 'bg-gray-800 text-white/80'
                                    : 'bg-gray-50/50'
                                }
                            `}
                        >
                            <h2 className="text-base tracking-wide">{com.comment}</h2>

                            <div className="flex justify-between items-center text-sm tracking-normal font-light text-gray-500 mx-0">
                                <p>{com.date?.split('T')[0]}</p>
                                <p>{com.user_name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </section>
    );
}