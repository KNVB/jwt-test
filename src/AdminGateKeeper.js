import AdminPlatForm from "./AdminPlatForm";
import { Navigate } from 'react-router-dom';
export default function AdminGateKeeper(){
    let finalComponent;
    if (sessionStorage.getItem("accessToken")){
        finalComponent=<AdminPlatForm/>
    } else {
        finalComponent=<Navigate to="/"/>
    }
    return finalComponent;
}