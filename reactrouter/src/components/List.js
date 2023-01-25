import React from "react";
import { Table } from 'react-bootstrap'

const List = (props) => {

    console.log(props);

    return(
        <div className="container">
            {/* A JSX comment */}

            {/* <div>
                <p>Valinta 2.</p>
            </div>
            */}
            <Table striped>
            <tbody>
                {props.comments.map(comment => {
                    return <tr>
                    <td>
                        <p>{comment.id}</p>
                    </td>
                    <td>
                        <p>{comment.body}</p>
                    </td>
                </tr>                    
                }
                )}
            </tbody>
            </Table>

        </div>
    )
}

export default List