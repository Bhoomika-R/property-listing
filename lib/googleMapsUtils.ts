export const openInGoogleMaps = (locationDetails: string) => {
    const locationDetailsEncoded = encodeURIComponent(locationDetails);
    const url = `https://www.google.com/maps/search/?api=1&query=${locationDetailsEncoded}`;
    window.open(url, '_blank');
  };
  