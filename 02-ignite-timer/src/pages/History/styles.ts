import styled from 'styled-components'

export const HistoryContainer = styled.main`
  height: 100%;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};

      font-size: 0.875rem;
      line-height: 1.6rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

/* The as const in this case, is so that, if we do not set it, and we inspect the constant, we would see that the properties
are just strings, which can be any string, if i set the as const at the end of the object and inspect it, we would see that
green is literaly 'green-500', yellow is 'yellow-500' and so on, there wouldn't be any other option,
so the theme will know that we are talking about an existing color
 */

interface StatusProps {
  // statusColor: 'green' | 'yellow' | 'red'
  statusColor: keyof typeof STATUS_COLORS
}

/* And here i basically changed so the available status colors are the keys of the type of the STATUS_COLORS const

and in this case, i can't just utilize the keyof, i need to use the keyof typeof, because typescript cannot read ts objects,
only the typing of the ts object  

*/

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
`
