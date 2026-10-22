import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import userApi from "../API/users";
import orderApi from "../API/orders";

const CompleteOrder = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t, i18n } = useTranslation();
  const userId = localStorage.getItem("userId");
  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

  const fetchData = async () => {
    if (!userId) return;
    try {
      const userRes = await userApi.get(`/${userId}`);
      setCartItems(userRes.data.cart || []);

      const ordersRes = await orderApi.get(`/?userId=${userId}`);
      const sortedOrders = ordersRes.data.sort(
        (a: any, b: any) => b.createdAt - a.createdAt,
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const cartTotalPrice = cartItems.reduce((total, item) => {
    try {
      const currentLang = i18n.language.split("-")[0];
      let rawPrice = "0";

      if (item?.price) {
        if (typeof item.price === "object") {
          rawPrice =
            item.price[currentLang] ||
            item.price["fa"] ||
            item.price["en"] ||
            "0";
        } else {
          rawPrice = String(item.price);
        }
      }

      const cleanString = String(rawPrice)
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
        .replace(/[^\d.]/g, "");

      const validNumber = Number(cleanString);
      const finalPrice = isNaN(validNumber) ? 0 : validNumber;
      const quantity = Number(item.quantity) || 1;

      return total + finalPrice * quantity;
    } catch (error) {
      console.error("خطا در محاسبه قیمت این آیتم:", item, error);
      return total;
    }
  }, 0);

  const getOrderStatus = (createdAt: number) => {
    const timePassed = currentTime - createdAt;
    const timeLimit = 60000;

    if (timePassed < timeLimit) {
      const remainingTime = timeLimit - timePassed;
      const seconds = Math.floor(remainingTime / 1000);
      return {
        status: "cooking",
        label: t("checkout.cooking"),
        color: "bg-orange-100 text-orange-600 border-orange-200",
        timer: `00:${seconds < 10 ? "0" : ""}${seconds}`,
      };
    } else {
      return {
        status: "ready",
        label: t("checkout.ready"),
        color: "bg-green-100 text-green-600 border-green-200",
        timer: null,
      };
    }
  };

  const handleCompleteOrder = async () => {
    if (cartItems.length === 0 || !userId) return;
    setIsSubmitting(true);

    try {
      const allOrdersRes = await orderApi.get("/");
      const allOrders = allOrdersRes.data;

      const nextOrderNumber =
        allOrders.length > 0
          ? Math.max(...allOrders.map((o: any) => Number(o.orderNumber) || 0)) +
            1
          : 1;

      const newOrder = {
        orderNumber: nextOrderNumber,
        userId: userId,
        items: cartItems,
        totalPrice: cartTotalPrice,
        createdAt: Date.now(),
      };

      await orderApi.post("/", newOrder);
      await userApi.patch(`/${userId}`, { cart: [] });
      fetchData();
    } catch (error) {
      toast.error(t("checkout.errorMsg"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-extrabold text-orange-500 mb-6">
          {t("checkout.cartTitle")}
        </h2>

        {cartItems.length === 0 ? (
          <div className="bg-white border rounded-3xl p-8 text-center shadow-sm">
            <p className="text-orange-300 mb-4">{t("checkout.emptyCart")}</p>
            <Link
              to="/menu"
              className="text-orange-500 font-bold hover:underline"
            >
              {t("checkout.returnToMenu")}
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.photo}
                      alt="food"
                      className="w-16 h-16 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {item.title[i18n.language]}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {t("checkout.quantity")} {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-orange-600 font-bold" dir="ltr">
                    {item.price[i18n.language]}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
              <div className="text-xl font-bold flex items-center gap-2 flex-wrap">
                <span>{t("checkout.totalAmount")}</span>
                <span className="text-orange-600" dir="ltr">
                  {cartTotalPrice.toLocaleString(locale)}
                </span>
                <span>{t("checkout.currency")}</span>
              </div>
              <button
                onClick={handleCompleteOrder}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-3 rounded-xl transition-all shadow-md disabled:bg-gray-400"
              >
                {isSubmitting
                  ? t("checkout.submitting")
                  : t("checkout.submitBtn")}
              </button>
            </div>
          </div>
        )}
      </div>

      {orders.length > 0 && (
        <div>
          <h2 className="text-2xl font-extrabold text-orange-500 mb-6">
            {t("checkout.trackOrders")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => {
              const { label, color, timer } = getOrderStatus(order.createdAt);

              return (
                <div
                  key={order.orderNumber}
                  className={`border rounded-3xl p-6 shadow-sm flex flex-col justify-between ${timer ? "bg-orange-50/50" : "bg-white"}`}
                >
                  <div className="flex justify-between items-start mb-6 border-b pb-4">
                    <div>
                      <p className="text-sm text-black font-medium">
                        {t("checkout.orderNumber")}
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-400 mt-1" dir="ltr">
                        {new Date(order.createdAt).toLocaleTimeString(locale, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${color}`}
                    >
                      <span className="font-bold text-sm">{label}</span>
                      {timer && (
                        <span
                          className="font-mono text-base bg-white/60 px-2 py-0.5 rounded-md font-bold"
                          dir="ltr"
                        >
                          {timer}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.photo}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <p className="text-sm font-medium text-gray-700">
                          {item.quantity}x {item.title[i18n.language]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="font-bold text-lg text-gray-900 border-t pt-4">
                    {t("checkout.total")}{" "}
                    <span dir="ltr">
                      {order.totalPrice.toLocaleString(locale)}
                    </span>{" "}
                    {t("checkout.currency")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteOrder;
