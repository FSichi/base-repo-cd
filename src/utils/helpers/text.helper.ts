export const getInitials = (fullName: string) => {
    const words = fullName.split(' ');
    const initials = words.map(word => word.slice(0, 1).toUpperCase()).slice(0, 2);
    return initials.join('');
};

export const formatPercentage = (percentage: number, minDigits: number = 2): string => {
    if (typeof percentage === 'string') return percentage;
    const sign = percentage >= 0 ? '+' : '';
    const formattedPercentage = `${sign}${percentage.toFixed(minDigits)}%`;
    return formattedPercentage;
};

export const formatPercentageNoSign = (percentage: number, minDigits: number = 2): string =>
    `${percentage.toFixed(minDigits)}`;

export const formatCurrency = (value: number, currency: string, maxDigits: number = 2): string =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDigits,
    }).format(value);

export const formatNumber = (number: number, digits: number = 2): string =>
    new Intl.NumberFormat('es-AR').format(Number(number.toFixed(digits)));

export const formatJSNumber = (number: string): number =>
    Number(
        number
            .trim()
            .replace(/[$]/g, '')
            .replace(/[^0-9,]/g, '')
            .replace(/[,]/g, '.'),
    );
