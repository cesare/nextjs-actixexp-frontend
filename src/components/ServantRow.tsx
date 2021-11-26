import Link from 'next/link'
import React from 'react'

import Servant from '../entities/Servant'

interface Props {
  servant: Servant,
}

class ServantRow extends React.Component<Props> {
  render() {
    return <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {this.props.servant.name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {this.props.servant.className}
          </div>
        </td>
        <td
          className="
            px-6
            py-4
            whitespace-nowrap
            text-right text-sm
            font-medium
          "
        >
          <Link href={{pathname: "/servants/[id]", query: { id: this.props.servant.id }}}>
            Details
          </Link>
        </td>
      </tr>
    </>
  }
}

export default ServantRow
