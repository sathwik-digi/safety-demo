import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "../../../../assets/Icons/search-icon.png";
import PencilIcon from "../../../../assets/Icons/pencil-icon.png";
import {yellowButtonColor} from "../../../../lib/theme";

const AddBookmark = () => {
  return (
    <div>
        <div className='text-center mt-20 mb-10'>
            <p className='text-[33px] text-[#888888]'>Add New Bookmark</p>
            <p className='text-[] text-[#7F7F7F]'>Save a new bookmark to your collection</p>
        </div>
        <form className='mx-[13vw] space-y-5'>
            <label htmlFor='name' className='text-[#686767]'>Name</label>
            <Input id='name' className="shadow-md !placeholder-[#C4C4C4]" placeholder='Bookmark name' />
            <div className='relative'>   
                <label htmlFor='icon' className='text-[#686767]' >Paste Icon URL *</label>
                <Input id='icon' className="shadow-md pl-12 !placeholder-[#C4C4C4]" placeholder="http://example.com" />
                <img src={SearchIcon} alt="search-icon" className='w-5 h-5 absolute top-9 left-4' />
            </div>
            <div className='relative mb-10'>   
                <label htmlFor='description' className='text-[#686767]'>Description</label>
                <Input id='description' className="shadow-md"   />
                <img src={PencilIcon} alt="pencil-icon" className='w-5 h-5 absolute right-3 top-9' />
            </div>
            <div className='text-center'>
                <Button className={`bg-[${yellowButtonColor}] text-white`}>Add Bookmark</Button>
            </div>
            
        </form>
            
    </div>
  )
}

export default AddBookmark
