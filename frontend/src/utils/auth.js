export function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    try {
      const payload = JSON.parse(window.atob(base64));
      return payload.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  