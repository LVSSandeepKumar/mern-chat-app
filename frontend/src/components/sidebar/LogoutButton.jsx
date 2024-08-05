import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const {logout} = useLogout();

  return (
    <div className="mt-auto">
        <BiLogOut className="size-6 cursor-pointer text-white"
          onClick={logout}
        />
    </div>
  )
}

export default LogoutButton