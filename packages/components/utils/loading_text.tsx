import {TypewriterText} from './typewriter_text';

export interface TypewriterTextProps {
    loadingAnimationTiming_ms?: number;
}

export const LoadingText = ({
    loadingAnimationTiming_ms,
}: TypewriterTextProps) => (
    <TypewriterText
        prefix="Loading"
        loadingAnimationTiming_ms={loadingAnimationTiming_ms}
    ></TypewriterText>
);
