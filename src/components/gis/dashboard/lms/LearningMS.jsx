import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {yellowButtonColor} from "../../../../lib/theme";
import lms from "../../../../assets/Images/lms-demo.jpeg";
import play from "../../../../assets/Images/video-play.png";

const LearningMS = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const lmsData = [
        { label: "All Recommendation" },
        { label: "Fire & Safety Manage Course" },
        { label: "Building safety management" },
        { label: "Fire Drill" },
        { label: "Mock Drill" },
        { label: "Safety Training" },
    ]

    const videoData = [
        {
          courseName: "React for Beginners",
          name: "John Doe",
          lessonCount: 25,
          duration: "6h 30m"
        },
        {
          courseName: "Mastering Node.js",
          name: "Jane Smith",
          lessonCount: 32,
          duration: "8h 15m"
        },
        {
          courseName: "JavaScript Essentials",
          name: "Michael Lee",
          lessonCount: 18,
          duration: "4h 45m"
        },
        {
          courseName: "Python for Data Science",
          name: "Sophia Johnson",
          lessonCount: 40,
          duration: "10h 20m"
        },
        {
          courseName: "UI/UX Design Fundamentals",
          name: "David Kim",
          lessonCount: 22,
          duration: "5h 10m"
        },
        {
          courseName: "Full-Stack Web Development",
          name: "Emma Brown",
          lessonCount: 55,
          duration: "15h 00m"
        }
      ];
      

    const handleClick=(index)=>{
        setActiveIndex(index);
    }

    return (
        <div>
            <div className="mx-7">
                <p className="text-[22px] md:text-[48px] font-extrabold">Learning Management System</p>
                <p className="text-[15px] md:text-[18px] text-[#6D7D8B] font-semibold">The Complete Course for a Management</p>
                <div className="mx-0 md:mx-12 flex gap-6 my-6 overflow-auto">
                    {lmsData.map((i,index) => (
                        <Button className={`${activeIndex=== index ?`border border-[${yellowButtonColor}] text-[${yellowButtonColor}]`:`border border-gray-200 text-gray-400`}`} onClick={()=>handleClick(index)} >{i.label}</Button>
                    ))
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 mx-0 md:mx-15">
                    {
                        videoData.map((i)=>(
                            <div className="border-1 border-transparent rounded-xl shadow-xl w-[88vw] md:w-[18vw] overflow-hidden relative">
                                <img src={lms} alt="lms-img" className="w-[88vw] md:w-[18vw] h-[50vw] md:h-[15vw] object-fill" />
                                <div className="p-5">
                                    <p className="font-semibold text-[14px]">{i.courseName}</p>
                                    <p className="text-[#595959] text-[12px]">{`By ${i.name}`}</p>
                                    <p className="text-[#595959] text-[12px]">{`${i.lessonCount} Lesson's . ${i.duration} Duration`}</p>
                                </div>
                                <img src={play} className="w-15 h-15 absolute top-[42vw] md:top-58 right-4" />

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default LearningMS;