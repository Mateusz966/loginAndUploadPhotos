function checkUserPasswords(password: string, repeatedPassword: string) : boolean {
  if (password === repeatedPassword) {
    return true;
  } else {
    return false
  }
}

export default checkUserPasswords;