import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCart } from "../../../context/cartContext";
import { Button } from "../../ui/Button";
import Header from "./Header";
import CartPageItem from "./CartPageItem";
import { Input } from "../../ui/Input";
import { checkoutSchema } from "../../../lib/zod/Schemas";
import type { CheckoutFormValues } from "../../../types/inferdTypes";
import { useCheckout } from "../../../hooks/checkout/useCheckout";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { mutateAsync: checkout, isPending } = useCheckout();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (values: CheckoutFormValues) => {
    await checkout(
      { formData: values },
      {
        onSuccess: () => {
          toast.success("Checkout successful!");
          clearCart();
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto pt-20 px-4">
        <Header
          title="Checkout"
          subtitle="Complete your purchase by filling your details"
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-10">
          {/* Left: Form */}
          <div>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                address: "",
                cardNumber: "",
                expiryDate: "",
                cvv: "",
              }}
              validationSchema={toFormikValidationSchema(checkoutSchema)}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm();
                clearCart();
              }}
            >
              {() => (
                <Form className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                  <FieldGroup
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                  />
                  <FieldGroup
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                  />
                  <FieldGroup
                    label="Phone Number"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                  />
                  <FieldGroup
                    label="Address"
                    name="address"
                    placeholder="123 Main St, City, State"
                  />

                  {/* Payment Information */}
                  <div className="pt-4 space-y-2">
                    <h4 className="text-lg font-semibold mb-2">
                      Payment Details
                    </h4>
                    <FieldGroup
                      label="Card Number"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FieldGroup
                        label="Expiry Date"
                        name="expiryDate"
                        placeholder="MM/YY"
                      />
                      <FieldGroup label="CVV" name="cvv" placeholder="123" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isPending || cart.length === 0}
                      className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isPending ? "Processing..." : "Pay Now"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right: Cart Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Review your cart
            </h2>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartPageItem
                  key={index}
                  item={item}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Discount</span>
                <span>-$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <Input placeholder="Discount code" className="w-full mb-2" />
              <Button className="w-full">Apply</Button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
              Secure Checkout – Your information is encrypted and safe.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

const FieldGroup = ({ label, name, placeholder, type = "text" }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <Field
      as={Input}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);
