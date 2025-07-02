export function validateForm({
  firstName,
  lastName,
  phone,
  email,
  selectedDate,
  selectedSlot,
}) {
  const errors = {};

  if (!firstName?.trim()) {
    errors.firstName = "Имя обязательно";
  } else if (firstName.trim().length < 2) {
    errors.firstName = "Имя должно содержать минимум 2 буквы";
  }

  if (!lastName?.trim()) {
    errors.lastName = "Фамилия обязательна";
  } else if (lastName.trim().length < 3) {
    errors.lastName = "Фамилия должна содержать минимум 3 буквы";
  }

  if (!phone?.trim()) {
    errors.phone = "Телефон обязателен";
  } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(phone)) {
    errors.phone = "Некорректный формат телефона";
  }

  if (!email?.trim()) {
    errors.email = "Email обязателен";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Некорректный email";
  }

  if (!selectedDate) {
    errors.selectedDate = "Выберите дату приёма";
  }

  if (!selectedSlot) {
    errors.selectedSlot = "Выберите время приёма";
  }

  return errors;
}
