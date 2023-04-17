export interface ColourOption {
    readonly value: string;
    readonly label: string;
  }
  
  export const Colors: readonly ColourOption[] = [
    { value: 'bg-white', label: 'White' },
    { value: 'bg-black', label: 'Black' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-yellow-500', label: 'Yellow' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-sky-500', label: 'Blue' },
    { value: 'bg-pink-500', label: 'Pink' },
  ];
