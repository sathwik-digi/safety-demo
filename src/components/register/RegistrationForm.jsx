import { useState } from "react";
import OwnershipIdentity from "./OwnerShipIdentity";
import FactoryOwnershipIdentity from "./FactoryOwnershipIdentity";

export default function RegistrationForm() {
  const [count,setCount] = useState(0);
  return (
    <> 
      <div className="flex gap-15 justify-center mt-3">
        <button onClick={()=>setCount(0)} className="border-transparent py-1 px-3 bg-amber-950 text-white">1</button>
        <button onClick={()=>setCount(1)} className="border-transparent py-1 px-3 bg-amber-950 text-white">2</button>
      </div>
      {count === 0 && (
        <OwnershipIdentity />
      )
      }
      {count===1 && (
        <FactoryOwnershipIdentity />
      )
      }
    </>
  );
}
