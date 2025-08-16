export const LightModeIcon = ({color = '#aaa', strokeWidth = 10}) => (
    <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g stroke={color} fill="none">
            <circle cx="50" cy="50" r="14" strokeWidth={strokeWidth * 0.8} />
            <g strokeLinecap="round" strokeWidth={strokeWidth} >
                <path d="m14 50h7"/>
                <path d="m79 50h7"/>
                <path d="m24.544 75.456 4.9497-4.9497"/>
                <path d="m70.506 29.494 4.9497-4.9497"/>
                <path d="m50 86v-7"/>
                <path d="m50 21v-7"/>
                <path d="m75.456 75.456-4.9497-4.9497"/>
                <path d="m29.494 29.494-4.9497-4.9497"/>
            </g>
        </g>
    </svg>
    
);