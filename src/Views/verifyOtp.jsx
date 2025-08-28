import React from 'react'

const VerifyOtp = (userId) => {
  return (
    <div>

        <div
                  className={`font-roboto flex justify-center items-center  genModal font-roboto ${userId ? "modal-show w-full" : ""}`}
                >
                  <div className="w-[400px]">
                    <h2 className="my-2">
                      Please enter your OTP to verify your account
                    </h2>

                    <input
                      type="text"
                      className=" w-full  py-2 px-2 outline-none rounded-[8px] border-[1px] border-private "
                      placeholder="Your OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="bg-private rounded-[8px] cursor-pointer text-center mt-4 py-2 text-white">
                      <button onClick={handleVerify}>Verify OTP</button>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default VerifyOtp