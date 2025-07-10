import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f2f1] px-10 py-3">
      <div className="flex items-center gap-4 text-[#171412]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
        </div>
        <h2 className="text-[#171412] text-lg font-bold leading-tight tracking-[-0.015em]">AI News</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-[#171412] text-sm font-medium leading-normal" href="#">News</a>
          <a className="text-[#171412] text-sm font-medium leading-normal" href="#">Features</a>
          <a className="text-[#171412] text-sm font-medium leading-normal" href="#">Explainers</a>
          <a className="text-[#171412] text-sm font-medium leading-normal" href="#">Resources</a>
          <a className="text-[#171412] text-sm font-medium leading-normal" href="#">About</a>
        </div>
        <div className="flex gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f4f2f1] text-[#171412] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-[#171412]" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f4f2f1] text-[#171412] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-[#171412]" data-icon="BookmarkSimple" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD63Kd8MnDwUZ3gENm0YuwWSQuxoxttiN4oeG72vLPwM1gZj4QGISSLWi_e1gHLccwrxN7-3PfpBip-AV_Ovuyl8mJrEv7YJa5JKNeiGJ0-AAjsof2kmpshN2y5uoR_oRPpJKCF_q1_XnspMN6JKEPBfa_CJxcbdx-ap_wiwpl6kl3TEwcpnBqsBVzPmScqYeKEIKwQ5RAQReHY-CbRXNMfFPUEvai2nkL-xPrb_-ehJaLwYfJDRxFrY693YygmEKzaL9cPgkAzV10')"}}></div>
      </div>
    </header>
  );
} 