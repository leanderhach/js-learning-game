export default function getColorFilter(color) {
    switch (color) {
        case '--robot-gold':
            return 'invert(81%) sepia(52%) saturate(447%) hue-rotate(351deg) brightness(98%) contrast(88%)';
        case '--robot-blue':
            return 'invert(23%) sepia(69%) saturate(7426%) hue-rotate(240deg) brightness(100%) contrast(96%)';
        case '--robot-green':
            return 'invert(70%) sepia(56%) saturate(543%) hue-rotate(88deg) brightness(87%) contrast(98%)';
        case '--robot-orange':
            return 'invert(61%) sepia(86%) saturate(3582%) hue-rotate(330deg) brightness(99%) contrast(104%)';
        case '--robot-grey':
            return 'invert(50%) sepia(20%) saturate(280%) hue-rotate(179deg) brightness(92%) contrast(86%)';
        case '--robot-lime':
            return 'invert(80%) sepia(67%) saturate(335%) hue-rotate(73deg) brightness(101%) contrast(86%)';
    }
}