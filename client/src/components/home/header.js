"use client";

import {useSession} from "next-auth/react";

function Header(){
  const {data:session} = useSession()

    return (
        <div>Header</div>
    );
}

export default Header

