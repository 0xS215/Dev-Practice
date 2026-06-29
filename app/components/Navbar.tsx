import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href='/' className="logo">
              <Image 
              src="/icons/logo.png"
              alt="logo"
              width={24}
              height={24}
              
              
              />
              <p>DevEvent</p>
            </Link>
            <ul>
                <Link href="/" className="font-bold"> Home</Link>
                <Link href="/" className="font-bold"> Events</Link>
                <Link href="/" className="font-bold">Create Event</Link>
            </ul>

        </nav>
    </header>
  )
}

export default Navbar