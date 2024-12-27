export const getNameInitials = (fullName: string | undefined | null) => {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/).filter(part => part.length > 0);

  if (parts.length === 0) {
    return "";
  } else if (parts.length === 1) {
    const name = parts[0];
    if (name.length >= 2) {
        return (name[0] + name[1]).toUpperCase();
    } else {
        return name[0].toUpperCase();
    }
  } else {
    const firstInitial = parts[0][0].toUpperCase();
    const lastInitial = parts[parts.length - 1][0].toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
}