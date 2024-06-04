"use client";
import React, { useState } from "react";
import useContactUs from "../../../hooks/useContactUs";
import { toast } from "react-toastify";

const ContactUsPage = () => {
  const { contactUs, isLoading } = useContactUs();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    business_email: "",
    message: "",
  });

  const handleSubmit = async () => {
    if (
      (form.first_name &&
        form.last_name &&
        form.business_email &&
        form.company_name,
        form.message)
    ) {
      const data = await contactUs(form);
      if (data.status.toLowerCase() === "ok") {
        setForm({
          first_name: "",
          last_name: "",
          company_name: "",
          business_email: "",
          message: "",
        });
        toast.success("Message Received!");
      } else {
        toast.error("There seems to be an issue. Please try again later!");
      }
    } else toast.error("All fields are required.");
  };

  return (
    <>
      <div className="mb-3 sm:mb-8 md:bg-home-hero-bg-d bg-home-hero-bg-m pt-20 sm:pt-[140px] pb-10 sm:pb-[66px] lg:px-10 px-5 rounded-[20px] bg-no-repeat bg-cover">
        <div className="flex max-w-[1180px] w-full m-auto">
          <div className="w-full mr-0 md:mr-11 lg:mr-[100px] flex flex-col justify-between">
            <div className="mb-7">
              <h1 className="text-[40px] lg:text-[52px] text-[#212427] mb-3 font-medium">
                Let's Connect
              </h1>
              <p className="text-[#616A73] text-base">
                {
                  "Want a custom enterprise solution? Need support or have general questions? Fill out the form to get in touch! We’re more than happy to answer questions or provide a demo."
                }
              </p>
            </div>
            <div className="mb-7 bg-white lg:p-6 p-4 rounded-[20px]">
              <h5 className="text-black text-lg mb-3 font-medium">
                Prefer email?
              </h5>
              <p className="text-sm md:text-base text-[#212427]">
                You can reach us at{" "}
                <a
                  href="mailto:support@bottest.ai"
                  className="text-[#388AEB] underline font-semibold"
                >
                  support@bottest.ai
                </a>
              </p>
            </div>
            <div className="bg-white lg:p-6 p-4 rounded-[20px]">
              <h5 className="text-black text-lg mb-3 font-medium">
                Prefer docs?
              </h5>
              <p className="text-sm md:text-base text-[#212427]">
                Check out our{" "}
                <a
                  href="#"
                  className="text-[#388AEB] underline font-semibold"
                >
                  documentation
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#388AEB] underline font-semibold"
                >
                  starter guides
                </a>
              </p>
            </div>
          </div>
          <div className="hidden md:block border border-[#D6E6F7] max-w-[590px] w-full bg-white rounded-[20px] p-8 contact-card">
            <h2 className="text-2xl font-medium mb-5 text-black">
              Contact Us
            </h2>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <span className="mb-1 text-[13px] text-[#616A73] font-medium">
                  First Name
                </span>
                <input
                  type="text"
                  className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
                  placeholder="First Name"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  value={form.first_name}
                />
              </div>
              <div>
                <span className="mb-1 text-[13px] text-[#616A73] font-medium">
                  Last Name
                </span>
                <input
                  type="text"
                  className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  value={form.last_name}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <span className="mb-1 text-[13px] text-[#616A73] font-medium">
                  Company Name
                </span>
                <input
                  type="text"
                  className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
                  placeholder="Company Name"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      company_name: e.target.value,
                    }))
                  }
                  value={form.company_name}
                />
              </div>
              <div>
                <span className="mb-1 text-[13px] text-[#616A73] font-medium">
                  Business Email
                </span>
                <input
                  type="text"
                  className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
                  placeholder="Business Email"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      business_email: e.target.value,
                    }))
                  }
                  value={form.business_email}
                />
              </div>
            </div>
            <div className="mb-5">
              <span className="mb-1 text-[13px] text-[#616A73] font-medium">
                Message
              </span>
              <input
                type="text"
                className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
                placeholder="Message"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                value={form.message}
              />
            </div>
            <button
              className="h-[52px] btn-gradient rounded-xl text-white w-full text-base hover:shadow-lg duration-200"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
            <p className="mt-3 text-[13px] text-[#616A73] tracking-tighter">
              By clicking, you agree to our{" "}
              <a href="/terms-of-service" className="text-[#388AEB] underline">
                Terms of Service
              </a> and <a href="/privacy-policy" className="text-[#388AEB] underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="block md:hidden border border-[#D6E6F7] mb-3 sm:mb-8 w-full bg-white rounded-[20px] py-6 px-5 sm:px-8 sm:py-8">
        <h2 className="text-2xl font-medium mb-5 text-black">Contact Us</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <span className="mb-1 text-[13px] text-[#616A73] font-medium">
              First Name
            </span>
            <input
              type="text"
              className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
              placeholder="First Name"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, first_name: e.target.value }))
              }
              value={form.first_name}
            />
          </div>
          <div>
            <span className="mb-1 text-[13px] text-[#616A73] font-medium">
              Last Name
            </span>
            <input
              type="text"
              className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
              placeholder="Last Name"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, last_name: e.target.value }))
              }
              value={form.last_name}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div>
            <span className="mb-1 text-[13px] text-[#616A73] font-medium">
              Company Name
            </span>
            <input
              type="text"
              className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
              placeholder="Company Name"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, company_name: e.target.value }))
              }
              value={form.company_name}
            />
          </div>
          <div>
            <span className="mb-1 text-[13px] text-[#616A73] font-medium">
              Business Email
            </span>
            <input
              type="text"
              className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
              placeholder="Business Email"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  business_email: e.target.value,
                }))
              }
              value={form.business_email}
            />
          </div>
        </div>
        <div className="mb-5">
          <span className="mb-1 text-[13px] text-[#616A73] font-medium">
            Message
          </span>
          <input
            type="text"
            className="border border-[#D6E6F7] rounded-xl h-11 px-4 w-full outline-none text-sm"
            placeholder="Message"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            value={form.message}
          />
        </div>
        <button
          className="h-[52px] btn-gradient rounded-xl text-white w-full text-base hover:shadow-lg duration-200"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <p className="mt-3 text-[13px] text-[#616A73] tracking-tighter">
          By clicking, you agree to our{" "}
          <a href="#" className="text-[#388AEB] underline">
            Terms & Conditions
          </a>
          ,{" "}
          <a href="#" className="text-[#388AEB] underline">
            Privacy
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#388AEB] underline">
            Data Protection Policy
          </a>
        </p>
      </div>
    </>
  );
};

export default ContactUsPage;
