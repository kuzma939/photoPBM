// Надсилаємо дані із state, а не з e.target
export const handleFormSubmit = async ({
  e,
  formValues,            // <— ДОДАЛИ
  setFormSubmitted,
  setSuccessMessageVisible,
  setFormValues,
  productData,
}) => {
  e.preventDefault();

  try {
    const payload = {
      ...formValues,
      // підкинь, якщо є вибраний продукт
      productName: productData?.name || "",
      productDescription: productData?.description || "",
      productImage: productData?.image || "",
      productPrice: productData?.price || "",
      productColor: productData?.color || "",
      productSize: productData?.size || "",
      productQuantity: productData?.quantity || "",
      productSKU: productData?.sku || "",
    };

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("API error:", data);
      alert(data.message || "Failed to send email");
      return;
    }

    setFormSubmitted(true);
    setSuccessMessageVisible(true);
    alert("Email sent successfully!");

    // очистити форму
    setFormValues((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
      bookingDate: "",
      bookingTime: "",
      durationOption: "1",
      customHours: "",
    }));

    setTimeout(() => setSuccessMessageVisible(false), 5000);
  } catch (error) {
    console.error("Error sending email:", error);
    alert(error?.message || "Error occurred");
  }
};

// як було — залишай
export const handleInputChange = (e, setFormValues) => {
  const { name, value } = e.target;
  setFormValues((prev) => ({ ...prev, [name]: value }));
};
