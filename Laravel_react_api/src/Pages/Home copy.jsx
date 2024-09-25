// import {  useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Home() {

//     const [posts, setPosts] = useState([])

//    async function getPosts() {
//     const res = await fetch("/api/posts");
//     const data = await res.json();

//     if (res.ok) {
//         setPosts(data)
//     }

//     // console.log(data);
//    }

//    useEffect(()=>{
//     getPosts();

//    }, []);
//     return (
//         <>
//         <h1 className="title">Latest Posts </h1>
//         {posts.length > 0 ? (
//             posts.map((post) => (
//             <div key={post.id} className="mb-4 border rounded-md border-dashed border-slate-400">
//                 <div className="mb-2 flex items-start justify-between">
//                     <div>
//                         <h2 className="font-bold text-2xl">{post.title}</h2>
//                         <small className="text-xs text-slate-600">
//                             Created by {post.user.firstname} on {" "}
//                             {new Date(post.created_at).toLocaleTimeString()}
//                         </small>
//                     </div>
//                     <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm
//                     rounded-lg px-3 py-1">
//                         Read more ...
//                     </Link>
//                 </div>

//                 <p>{post.body}</p>
//             </div>
//         ))
//     ) : (
//         <p>There are no posts</p>
//     )}
//         </>
//     );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const success = location.state?.success; 

    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const res = await fetch("/api/posts");
        const data = await res.json();

        if (res.ok) {
            setPosts(data);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h1 className="title">Latest Posts</h1>
            {success && (
                <div className="success-message bg-green-500 text-white p-2 mb-4">
                    {success}
                </div>
            )}
            {posts.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">User ID</th>
                            <th className="px-4 py-2 border">First Name</th>
                            <th className="px-4 py-2 border">Message</th>
                            <th className="px-4 py-2 border">Timestamp</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-4 py-2 border">{post.user.id}</td>
                                <td className="px-4 py-2 border">{post.user.firstname}</td>
                                <td className="px-4 py-2 border">{post.body}</td>
                                <td className="px-4 py-2 border">{new Date(post.created_at).toLocaleString()}</td>
                                <td className="px-4 py-2 border">
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1"
                                    >
                                        Read more ...
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There are no posts</p>
            )}
        </>
    );
}
