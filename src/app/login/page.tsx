"use client"
import { emailLogin, oAuthLogin } from "@/actions/login"
import Logo from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OAuthMethods } from "@/types/auth"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    const errOrUndefined = await emailLogin(email)
    if (errOrUndefined) {
      setError(errOrUndefined.error)
    }
  }
  const handleOAuthButton = async (method: OAuthMethods) => {
    setError("")
    const errOrUndefined = await oAuthLogin(method)
    if (errOrUndefined) {
      setError(errOrUndefined.error)
    }
  }
  return (
    <>
      <div className="px-7 flex flex-col gap-4 py-7 min-w-[360px] h-full justify-center">
        <div className="flex flex-col justify-center items-center self-center">
          <Logo />
          <h1 className="font-DMSansItalic text-[44px] font-medium text-accent-blue">
            CIRCLES.
          </h1>
        </div>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="text-text-black">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@outlook.com"
              className="rounded-full"
            />
          </div>
          <Button
            className="rounded-full w-full h-11 bg-accent-blue mb-6"
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="relative flex items-center ">
          <div className="flex-grow border-t mr-3 bg-text-black"></div>
          <p className="self-center text-sm">OR</p>
          <div className="flex-grow border-t ml-3 bg-text-black"></div>
        </div>
        <div className="flex self-center gap-[10px]">
          <Button
            className="rounded-full outline-1 outline outline-text-black bg-transparent h-14 w-14"
            onClick={async () => await handleOAuthButton("google")}
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="size-5"
            >
              <g clipPath="url(#clip0_4638_558)">
                <path
                  d="M3.94919 7.32375C4.3001 6.26209 4.97733 5.33836 5.88427 4.68435C6.79121 4.03034 7.88153 3.67945 8.99969 3.68175C10.2672 3.68175 11.4132 4.13175 12.3132 4.86825L14.9322 2.25C13.3362 0.85875 11.2909 0 8.99969 0C5.45219 0 2.39819 2.0235 0.929688 4.9875L3.94919 7.32375Z"
                  fill="#0E0E0E"
                />
                <path
                  d="M12.03 13.5099C11.2125 14.0372 10.1745 14.3184 8.99998 14.3184C7.88629 14.3207 6.80009 13.9726 5.89516 13.3234C4.99024 12.6743 4.31244 11.7569 3.95773 10.7012L0.927734 13.0014C1.67117 14.5061 2.82169 15.7722 4.2486 16.6558C5.67552 17.5395 7.32164 18.0052 8.99998 18.0002C11.1997 18.0002 13.3012 17.2179 14.8755 15.7502L12.0307 13.5099H12.03Z"
                  fill="#0E0E0E"
                />
                <path
                  d="M14.8755 15.7498C16.5217 14.2138 17.5905 11.9278 17.5905 8.99978C17.5905 8.46728 17.5087 7.89503 17.3865 7.36328H9V10.841H13.827C13.5893 12.0103 12.9495 12.9155 12.0308 13.5095L14.8755 15.7498Z"
                  fill="#0E0E0E"
                />
                <path
                  d="M3.95784 10.7008C3.77435 10.1525 3.68114 9.57801 3.68184 8.9998C3.68184 8.4133 3.77559 7.85006 3.94959 7.32355L0.930087 4.9873C0.312371 6.23432 -0.00605996 7.60819 8.73409e-05 8.9998C8.73409e-05 10.4398 0.333837 11.7973 0.927837 13.0011L3.95784 10.7008Z"
                  fill="#0E0E0E"
                />
              </g>
              <defs>
                <clipPath id="clip0_4638_558">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
          <Button
            className="rounded-full outline-1 outline outline-text-black bg-transparent h-14 w-14"
            onClick={async () => await handleOAuthButton("apple")}
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              className="size-5"
            >
              <path
                d="M3.96645 19.4772C3.57805 19.2188 3.23381 18.8996 2.94698 18.5317C2.63146 18.1519 2.33913 17.7535 2.07157 17.3386C1.44368 16.4187 0.95128 15.4134 0.609465 14.3534C0.198846 13.1222 0 11.942 0 10.7878C0 9.49864 0.278877 8.37329 0.824317 7.42769C1.22864 6.6886 1.82311 6.07097 2.54621 5.6387C3.24698 5.20344 4.05217 4.96524 4.87695 4.9492C5.16568 4.9492 5.47657 4.99106 5.80654 5.07109C6.04355 5.1382 6.33228 5.24408 6.68503 5.37583C7.13382 5.54882 7.38068 5.6547 7.46441 5.68056C7.72728 5.7766 7.94829 5.81846 8.12189 5.81846C8.25364 5.81846 8.43955 5.7766 8.65071 5.71257C8.76953 5.67071 8.99361 5.59684 9.31435 5.45955C9.63201 5.34381 9.88195 5.2447 10.0808 5.17083C10.3855 5.08094 10.6804 4.99784 10.9433 4.95597C11.2549 4.90684 11.5712 4.89383 11.8858 4.91719C12.431 4.95282 12.968 5.06836 13.4796 5.26009C14.3163 5.59684 14.9928 6.12258 15.4964 6.86994C15.2836 7.00113 15.0838 7.15244 14.8999 7.32181C14.4995 7.67676 14.1584 8.09346 13.8896 8.55613C13.5383 9.18841 13.3562 9.90068 13.3608 10.624C13.3738 11.5123 13.6015 12.2948 14.0503 12.9714C14.3803 13.4728 14.8091 13.9016 15.3105 14.2315C15.5672 14.4045 15.7882 14.5233 16 14.6034C15.9009 14.9112 15.795 15.2091 15.67 15.5046C15.3866 16.1673 15.0431 16.8026 14.6438 17.4026C14.288 17.9191 14.0091 18.3039 13.7973 18.56C13.4673 18.9509 13.1497 19.2495 12.8289 19.4576C12.4762 19.6915 12.0594 19.8165 11.6359 19.8165C11.349 19.8275 11.0622 19.7928 10.7863 19.7136C10.5493 19.6336 10.3147 19.5468 10.0839 19.4477C9.84387 19.3375 9.59639 19.2443 9.34329 19.1688C8.71763 19.0081 8.06164 19.0071 7.43547 19.1657C7.17876 19.2396 6.9319 19.3258 6.68811 19.4317C6.34521 19.5758 6.11743 19.6724 5.98569 19.7136C5.72282 19.7906 5.4501 19.8386 5.1743 19.8546C4.74767 19.8546 4.34998 19.7327 3.95598 19.4859L3.96645 19.4772ZM9.59323 4.32373C9.03547 4.60261 8.50296 4.72142 7.97414 4.68264C7.89103 4.15013 7.97414 3.6053 8.19515 3.00876C8.38331 2.50338 8.66132 2.03619 9.01577 1.62977C9.39008 1.20193 9.84428 0.851241 10.3529 0.597374C10.8947 0.318497 11.4112 0.16767 11.9049 0.145508C11.9689 0.703261 11.9049 1.25178 11.6999 1.84462C11.5102 2.36869 11.2327 2.85666 10.8793 3.28764C10.5185 3.71607 10.0759 4.06812 9.57722 4.32311L9.59323 4.32373Z"
                fill="#0E0E0E"
              />
            </svg>
          </Button>
          <Button
            className="rounded-full outline-1 outline outline-text-black bg-transparent h-14 w-14"
            onClick={async () => await handleOAuthButton("facebook")}
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              className="size-5"
            >
              <path
                d="M10.421 11.1869L10.9489 7.7485H7.64939V5.51719C7.64939 4.57669 8.11014 3.65934 9.58798 3.65934H11.0878V0.732156C11.0878 0.732156 9.72692 0.5 8.42542 0.5C5.70842 0.5 3.93252 2.14706 3.93252 5.12828V7.74909H0.912109V11.1875H3.93252V19.5H7.64939V11.1875L10.421 11.1869Z"
                fill="#0E0E0E"
              />
            </svg>
          </Button>
        </div>
        <div>
          <p className="text-center text-sm text-text-black">
            Don't have an account?{" "}
            <a href="#" className="text-accent-blue">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
