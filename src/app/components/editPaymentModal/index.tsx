"use client";

import { Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import _ from "lodash";
import CustomButton from "../../../elements/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import CustomInput from "../../../elements/input";
import { Option, PaymentOptionsProps } from "../../../utils/typesInterface";
import CustomSelect from "../../../elements/select";
import { countries } from "../../../utils/common";

interface ModalProps {
  title: string;
  isEditPaymentMethodModal?: boolean;
  setIsEditPaymentMethodModal: (isEditPaymentMethodModal: boolean) => void;
}

const EditPaymentMethodModal: React.FC<ModalProps> = ({
  title,
  isEditPaymentMethodModal,
  setIsEditPaymentMethodModal,
}: ModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);

  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  const options: PaymentOptionsProps = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {
      theme: "stripe",
      // variables: {
      //   fontFamily: "Ideal Sans, system-ui, sans-serif",
      // },
    },
  };

  return (
    <Dialog.Root
      open={isEditPaymentMethodModal}
      onOpenChange={setIsEditPaymentMethodModal}
    >
      <Dialog.Content maxWidth={"480px"} className="max-h-[538px]">
        <Dialog.Title>
          <div className="border-b border-[#f5f5f5] dark:border-b  dark:border-[#434447] py-5 px-6 ">
            <p className="font-poppin text-black text-base font-semibold dark:text-white ">
              {title}
            </p>
          </div>
        </Dialog.Title>
        <div>
          <div className="px-5 pt-2 pb-6">
            <Elements stripe={stripePromise} options={options}>
              <div className="parent_Div">
                <CustomInput
                  type="text"
                  label="Name on card"
                  placeholder="Enter your name on card"
                />
                <div className="flex gap-3 my-4">
                  <div className="w-[222px] flex flex-col">
                    <label
                      htmlFor=""
                      className="font-poppins text-sm font-normal mb-2 "
                    >
                      {" "}
                      Card number
                    </label>

                    <CardNumberElement
                      options={{
                        classes: {
                          base: "py-[6px] pl-3 border border-[#c6c7c9] rounded-[4px] text-black text-sm  font-light",
                          empty: "placeholder-gray-300 font-normal ",
                          focus: "ring-[#6b77f7] ring-1 outline-none",
                          invalid: "text-danger ring-danger outline-none",
                        },
                        style: {
                          base: {
                            color: "#212427",
                            fontFamily: `"Poppins", sans-serif`,
                            fontSize: "14px",
                            fontWeight: 400,
                          },
                          empty: {
                            "::placeholder": {
                              color: "#b0b3ba",
                              fontWeight: 400,
                              fontFamily: `"Poppins", sans-serif`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="w-[92px] flex flex-col ">
                    <label
                      htmlFor=""
                      className="font-poppins text-sm font-normal mb-2 "
                    >
                      {" "}
                      Expiry date
                    </label>

                    <CardExpiryElement
                      options={{
                        classes: {
                          base: "py-[6px] pl-3  border border-[#c6c7c9] rounded-[4px] text-black text-sm font-poppin font-light ",
                          empty: " font-normal font-poppin",
                          focus:
                            "ring-[#6b77f7] ring-1 outline-none border-indigo-600",
                          invalid: "text-danger ring-danger",
                        },
                        style: {
                          base: {
                            color: "#212427",
                            fontFamily: `"Poppins", sans-serif`,
                            fontSize: "14px",
                            fontWeight: 400,
                          },
                          empty: {
                            "::placeholder": {
                              color: "#b0b3ba",
                              fontWeight: 400,
                              fontFamily: `"Poppins", sans-serif`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex-1  flex flex-col">
                    <label
                      htmlFor=""
                      className="font-poppins text-sm font-normal mb-2 "
                    >
                      {" "}
                      CVC
                    </label>

                    <CardCvcElement
                      options={{
                        classes: {
                          base: "py-[6px] pl-3  border border-[#c6c7c9] rounded-[4px] text-black text-sm font-poppin font-light ",
                          empty: "font-normal font-poppin",
                          focus:
                            "ring-[#6b77f7] ring-1 outline-none border-indigo-600",
                          invalid: "text-danger ring-danger",
                        },
                        style: {
                          base: {
                            color: "#212427",
                            fontFamily: `"Poppins", sans-serif`,
                            fontSize: "14px",
                            fontWeight: 400,
                          },
                          empty: {
                            "::placeholder": {
                              color: "#b0b3ba",
                              fontWeight: 400,
                              fontFamily: `"Poppins", sans-serif`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="font-poppins text-sm font-normal"
                  >
                    Billing address
                  </label>
                  <CustomInput
                    type="text"
                    placeholder="Address line 1"
                    className={"mt-2 rounded-md"}
                  />
                  <CustomInput
                    type="text"
                    placeholder="Address line 2"
                    className={"mt-3 rounded-md"}
                  />
                </div>
                <div className="flex w-full justify-between my-3">
                  <CustomInput
                    type="text"
                    placeholder="City"
                    className={"w-[212px]"}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="border border-[#c6c7c9] w-[212px] py-0.5 pl-3 rounded-[4px] focus:outline-none focus:ring-1 ring-[#6b77f7] text-sm "
                    placeholder="Postal code"
                  />
                </div>
                <div className="flex w-full justify-between mt-3">
                  <CustomInput
                    type="text"
                    placeholder="State/province/region"
                    className={"w-[212px]"}
                  />
                  <div className="w-[212px]">
                    <CustomSelect
                      isNoLabel={true}
                      placeholder="Country"
                      isAddedBtn={false}
                      selectedValue={countries?.find(
                        (item) => item?.id === selectedCountry?.id
                      )}
                      options={countries || []}
                      onSelectChange={(selectedOption) => {
                        setSelectedCountry(selectedOption);
                      }}
                    />
                  </div>
                </div>
              </div>
            </Elements>
          </div>
        </div>

        <div className="border-t border-[#f5f5f5] dark:border-t  dark:border-[#434447]">
          <Flex gap="3" py={"3"} px={"3"} justify="end">
            <Dialog.Close>
              <CustomButton variant="outline" color="gray">
                Discard
              </CustomButton>
            </Dialog.Close>
            <Dialog.Close>
              <CustomButton color="blue" variant="solid" isPrimary>
                Save changes
              </CustomButton>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditPaymentMethodModal;
