import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
    render() {
        const { users, isFirst, isLoading, err } = this.props;

        return (
            <div className="row">
                {
                    isFirst ? <h2>Welcome! enter a keyword to search gitHub users</h2> : isLoading ? <h2>loading......</h2> :
                        err ? <h2 style={{ color: "red" }}>{err}</h2> :
                            users.map((userObj) => {
                                return (
                                    <div className="card" key={userObj.id}>
                                        <a href={userObj.html_url
                                        } target="_blank" rel="noreferrer">
                                            <img src={userObj.avatar_url} alt={'avator'} style={{ width: '100px' }} />
                                        </a>
                                        <p className="card-text">{userObj.login}</p>
                                    </div>
                                )
                            })

                }
            </div>
        )
    }
}
