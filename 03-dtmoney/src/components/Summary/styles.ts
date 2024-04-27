import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    margin-top: -5rem;
`

interface SummaryCardProps {
    variant?: 'green';
}

export const SummaryCard = styled.div<SummaryCardProps>`
    background: ${props => props.theme['gray-600']};
    border-radius: 6px;
    padding: 2rem;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${props => props.theme['gray-300']};
    }

    strong {
        /*Styling Reminder:
        
        Strong tags by default have the display as inline, in that display type we cannot apply margins on those type
        of the tags, that are also other cases where this happens
        */
        display: block;

        margin-top: 1rem;
        font-size: 2rem;
    }

    ${props => props.variant === 'green' && css`
        background-color: ${props.theme['green-700']};
    `}
`

