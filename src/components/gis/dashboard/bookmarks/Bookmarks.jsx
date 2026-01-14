import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddIcon from "../../../../assets/Icons/add-icon.png"
import ThreeDotsIcon from "../../../../assets/Icons/three-dots-icon.png";
import EditRoleIcon from "../../../../assets/Icons/edit-role-icon.png";
import DeleteRoleIcon from "../../../../assets/Icons/delete-role-icon.png";
import {yellowButtonColor} from "../../../../lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {

  const navigate = useNavigate();

  const bookmarksData = [
    {
      id: 1,
      title: "React Documentation",
      url: "https://react.dev",
      description: "Official React documentation for building modern web apps.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/919/919851.png"
    },
    {
      id: 2,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Comprehensive resource for web development docs and tutorials.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/732/732212.png"
    },
    {
      id: 3,
      title: "GitHub",
      url: "https://github.com",
      description: "Platform for version control, collaboration, and open source code.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/733/733553.png"
    },
    {
      id: 4,
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      description: "Community Q&A site for programmers and developers.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2111/2111628.png"
    },
    {
      id: 5,
      title: "NPM Packages",
      url: "https://www.npmjs.com",
      description: "Registry of JavaScript packages for Node.js and frontend development.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png"
    },
    {
      id: 6,
      title: "Tailwind CSS",
      url: "https://tailwindcss.com",
      description: "Utility-first CSS framework for rapidly building custom designs.",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/919/919825.png"
    }
  ];
  
  
    return (
      <div className="mx-10 mt-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[33px]">Categories</p>
            <p className="text-[19px] text-[#7F7F7F]">Organize your bookmarks</p>
          </div>
          <Button onClick={()=> navigate('/gis/add-bookmark')} className={`bg-[${yellowButtonColor}] text-white`}><img src={AddIcon} className="w-5 h-5" alt="add-icon" />New Bookmark</Button>
        </div>
        <div className="grid grid-cols-3 gap-6 my-5">
          {bookmarksData.map((i,index)=>(
            <div key={index} className="shadow-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <img src={i.iconUrl} alt="bookmark-icon" className="w-7 h-7" />
                <p className="text-[#121212] font-semibold">{i.title}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger> <img src={ThreeDotsIcon} className="w-7 h-7" /></DropdownMenuTrigger>
                  <DropdownMenuContent className="shadow-xl shadow-gray-300" align="start" >
                    <DropdownMenuItem onClick={() => navigate('/gis/edit-bookmark')} className="text-[#9D9D9D]"><img src={EditRoleIcon} className="w-5 h-5" />Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-[#D41414]"><img src={DeleteRoleIcon} className="w-4 h-4" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="bg-[#FAFAFA] p-4">
                <p>{i.description}</p>
              </div>
              
            </div>
          ))
          }
        </div>
      </div>
    )
}

export default Bookmarks;