import create from "zustand";
interface UserInfo{
    name:String,
    username:String,
    id:Number,
    avatar:String
}
interface TagInfo {
    id:Number,
    name:string,
    avatar:string
}
interface AuthState{
    user:UserInfo,
    isAuthenticate:any,
    requestlogin:boolean,
    showMenuMobile:boolean,
    notify:any,
    listtag:TagInfo[],
    updateuser: (data:any)=>void,
    updateauthstate: (data:any) => void
}
export const authStore = create<AuthState>((set) => ({
    // initial state
    user: {name:'',username:'',avatar:'',id:0},
    isAuthenticate:null,
    requestlogin:false,
    showMenuMobile:false,
    notify:null,
    listtag:[],
    updateauthstate: (data:any) => set((state)=>({
        ...state,...data
    })),
    updateuser: (data:any) => set((state) => ({
        user: {...state.user,...data}
    }))
}));