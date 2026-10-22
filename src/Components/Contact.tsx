import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      id: 1,
      title: t("info.phone"),
      value: t("info.phoneText"),
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: t("info.email"),
      value: t("info.emailText"),
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: t("info.address"),
      value: t("info.addressText"),
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-orange-600 mb-4">
          {t("info.contactTitle")}
        </h1>
        <p className="text-gray-600 text-lg">{t("info.contactSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(234,88,12,0.1)] transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {method.icon}
            </div>
            <h3 className="text-xl font-bold text-amber-600 mb-2">
              {method.title}
            </h3>
            <p className="text-gray-600 font-medium" dir="ltr">
              {method.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
