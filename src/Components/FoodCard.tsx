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

interface CartItem {
  productId: string;
  quantity: number;
  title?: LocalizedField;
  price?: LocalizedField;
  photo?: string;
}

const FoodCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const response = await api.get("/");

        if (!cancelled) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error getting products from API:", error);
      }
    };

    const fetchUserCart = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await userApi.get(`/${userId}`);

        if (!cancelled) {
          setCartItems(response.data.cart || []);
        }
      } catch (error) {
        console.error("خطا در دریافت سبد خرید:", error);
      }
    };

    fetchProducts();
    fetchUserCart();

    return () => {
      cancelled = true;
    };
  }, []);

  const getProductQuantity = (productId: string) => {
    return (
      cartItems.find((item) => item.productId === productId)
        ?.quantity ?? 0
    );
  };

  const updateCartInDB = async (newCart: CartItem[]) => {
    const userId = localStorage.getItem("userId");

    if (!userId) return false;

    try {
      await userApi.patch(`/${userId}`, {
        cart: newCart,
      });

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
          "Please sign in to add items to your cart."
      );
      return;
    }

    const newCart = cartItems.map((item) => ({ ...item }));

    const existingItem = newCart.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
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
        `${t("checkout.addedToCart")}: ${
          product.title[i18n.language] ??
          product.title.en ??
          ""
        }`
      );
    } else {
      toast.error(t("checkout.cartError"));
    }
  };

  const handleDecrement = async (product: Product) => {
    const newCart = cartItems.map((item) => ({ ...item }));

    const existingItemIndex = newCart.findIndex(
      (item) => item.productId === product.id
    );

    if (existingItemIndex === -1) return;

    if (newCart[existingItemIndex].quantity > 1) {
      newCart[existingItemIndex].quantity -= 1;
    } else {
      newCart.splice(existingItemIndex, 1);
      toast.success(t("card.removed"));
    }

    setCartItems(newCart);

    const isSaved = await updateCartInDB(newCart);

    if (!isSaved) {
      toast.error(t("checkout.cartError"));
    }
  };

  return (
    <>
      {products.map((product) => {
        const quantity = getProductQuantity(product.id);
        const language = i18n.language;

        const title =
          product.title?.[language] ??
          product.title?.en ??
          Object.values(product.title ?? {})[0] ??
          "";

        const price =
          product.price?.[language] ??
          product.price?.en ??
          Object.values(product.price ?? {})[0] ??
          "";

        const description =
          product.description?.[language] ??
          product.description?.en ??
          Object.values(product.description ?? {})[0] ??
          "";

        return (
          <article
            key={product.id}
            dir={i18n.dir()}
            className="group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-amber-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(234,88,12,0.15)] sm:w-[320px]"
          >
            <div className="relative h-52 shrink-0 overflow-hidden">
              <img
                src={product.photo}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-e-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm">
                <span className="text-sm font-bold text-gray-800">
                  {price}
                </span>
              </div>
            </div>

            <div className="flex grow flex-col p-5">
              <h3 className="mb-2 truncate text-xl font-extrabold text-gray-800">
                {title}
              </h3>

              <p className="mb-6 line-clamp-2 grow text-sm leading-relaxed text-gray-500">
                {description}
              </p>

              <div className="mt-auto">
                {quantity > 0 ? (
                  <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-white/60 px-2 py-1.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleDecrement(product)}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-xl font-bold text-orange-600 transition-colors hover:bg-orange-200"
                    >
                      -
                    </button>

                    <span className="min-w-[30px] text-center text-lg font-bold text-gray-800">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleIncrement(product)}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white shadow-md transition-colors hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleIncrement(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-bold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:bg-orange-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L4.7 15.3c-.63.63-.18 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>

                    {t("checkout.addToCart") ||
                      "افزودن به سبد خرید"}
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default FoodCard;
