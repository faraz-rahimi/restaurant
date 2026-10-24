import api from "../API/products";
import userApi from "../API/users";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

type LocalizedField = Record<string, string>;

interface Product {
  id: string;
  photo: string;
  title: LocalizedField;
  price: LocalizedField;
  description: LocalizedField;
}

const FoodCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/");
        setProducts(response.data);
      } catch (error) {
        console.error("error in getting data from database", error);
      }
    };

    const fetchUserCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const userResponse = await userApi.get(`/${userId}`);
        setCartItems(userResponse.data.cart || []);
      } catch (error) {
        console.error("خطا در دریافت سبد خرید:", error);
      }
    };

    fetchProducts();
    fetchUserCart();
  }, []);

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find((cartItem) => cartItem.productId === productId);
    return item ? item.quantity : 0;
  };

  const updateCartInDB = async (newCart: any[]) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return false;
    try {
      await userApi.patch(`/${userId}`, { cart: newCart });
      return true;
    } catch (error) {
      console.error("خطا در آپدیت سبد خرید:", error);
      return false;
    }
  };

  const handleIncrement = async (product: Product) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error(
        t("checkout.loginRequired") ||
          "please sign in to add items to your cart.",
      );
      return;
    }

    let newCart = [...cartItems];
    const existingItemIndex = newCart.findIndex(
      (item: any) => item.productId === product.id,
    );

    if (existingItemIndex !== -1) {
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart.push({
        productId: product.id,
        quantity: 1,
        title: product.title,
        price: product.price,
        photo: product.photo,
      });
    }

    setCartItems(newCart);
    const isSaved = await updateCartInDB(newCart);

    if (isSaved) {
      toast.success(
        `${t("checkout.addedToCart")}: ${product.title[i18n.language]}`,
      );
    } else {
      toast.error(t("checkout.cartError"));
    }
  };

  const handleDecrement = async (product: Product) => {
    let newCart = [...cartItems];
    const existingItemIndex = newCart.findIndex(
      (item: any) => item.productId === product.id,
    );

    if (existingItemIndex !== -1) {
      if (newCart[existingItemIndex].quantity > 1) {
        newCart[existingItemIndex].quantity -= 1;
      } else {
        newCart.splice(existingItemIndex, 1);
        toast.success(t("card.removed"))
      }

      setCartItems(newCart);
      await updateCartInDB(newCart);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-8 no-scrollbar snap-x snap-mandatory">
        {products.map((product) => {
          const quantity = getProductQuantity(product.id);

          return (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] shrink snap-center bg-amber-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(234,88,12,0.15)] transition-all duration-300 overflow-hidden group border flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.photo}
                  alt="food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 inset-e-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="font-bold text-gray-800 text-sm">
                    {product.price[i18n.language]}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col grow">
                <h3 className="font-extrabold text-xl text-gray-800 mb-2 truncate">
                  {product.title[i18n.language]}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 mb-6 grow leading-relaxed">
                  {product.description[i18n.language]}
                </p>

                <div className="mt-auto">
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between bg-white/60 rounded-xl px-2 py-1.5 shadow-sm border border-orange-200">
                      <button
                        onClick={() => handleDecrement(product)}
                        className="w-10 h-10 flex justify-center items-center bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors font-bold text-xl"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-800 text-lg min-w-[30px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(product)}
                        className="w-10 h-10 flex justify-center items-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-bold text-xl shadow-md"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleIncrement(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-bold transition-all shadow-md hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {t("checkout.addToCart") || "افزودن به سبد خرید"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodCard;
