type OrcidIconProps = {
    className?: string;
};

export function OrcidIcon({ className }: OrcidIconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11.5" fill="currentColor" />
            <text
                x="12"
                y="15.25"
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="#ffffff"
                fontFamily="Segoe UI, Arial, sans-serif"
                letterSpacing="-0.4"
            >
                iD
            </text>
        </svg>
    );
}
