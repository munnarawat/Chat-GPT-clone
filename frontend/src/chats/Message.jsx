import React from 'react'
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
const Message = ({content}) => {
  return (
    <div className='prose prose-invert max-w-none p-3 rounded-xl bg-gray-800/40 shadow-lg'>
     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
        </ReactMarkdown>
    </div>
  )
}

export default Message