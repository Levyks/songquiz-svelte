export function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export function getRandomBackgroundAndTextColor() {

    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    const textColor = (red * 0.299 + green * 0.587 + blue * 0.114) > 186 ? '#000000' : '#ffffff';

    const backgroundColor = '#' + [red, green, blue].map(x => x.toString(16).padStart(2, '0')).join('');

    return [backgroundColor, textColor];
}