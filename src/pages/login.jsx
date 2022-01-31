import { AppLayout } from "../layouts/app-layout";
import LabelIcon from '../assets/images/toastmasterswordmarkcolor.png'
import Logo from '../assets/images/toastmasters-logo-color-png.png'

export function Login() {
    return (
        <AppLayout>
            <div className="flex min-h-screen">
                <div className="w-full md:w-1/2 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg p-8 shadow-md flex-1 mx-4 sm:mx-12 md:mx-8 lg:mx-12 2xl:mx-24 max-w-md">
                        <div className="flex flex-col items-stretch space-y-5">
                            <div className="max-w-xs mx-auto">
                                <img src={Logo} className="h-32 opacity-90" alt="" />
                            </div>
                            <div className="">
                                <label htmlFor="email" className="p-1">Email</label>
                                <input id="email" type="email" placeholder="Your Email" className="form-input w-full rounded-lg focus:ring-blue-300" />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="p-1">Password</label>
                                <input id="password" type="password" placeholder="Your Password" className="form-input w-full rounded-lg focus:ring-blue-300" />
                            </div>
                            <div>
                                <button
                                    className="transition-colors bg-tm-500 focus:bg-tm-600 hover:bg-tm-600
                                    focus:ring ring-blue-300 text-white font-bold px-4 py-3 w-full rounded-lg"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 absolute md:relative md:flex h-full w-full md:h-auto bg-white">
                    <div className="absolute h-full pb-32">
                        <img className="object-cover h-full" src="https://toastmasterscdn.azureedge.net/medias/images/pubs-and-magazine/2020-digital-magazine/05/what-to-expect-at-your-first-tm-meeting/toastmasters-14-first-club-meeting.png" alt="" />
                    </div>
                    <div className="absolute pb-32 h-full w-full">
                        <div className="bg-gradient-to-b from-transparent to-white h-full w-full"></div>
                    </div>
                    <div className="flex items-center py-8 px-2 w-full xl:px-48 z-30 bottom-0 absolute">
                        <div className="max-w-xs mx-auto">
                            <img src={LabelIcon} alt="Toastmasters logo" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}