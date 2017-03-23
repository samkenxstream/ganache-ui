import React, { Component } from 'react'
import Moment from 'react-moment'
import EtherUtil from 'ethereumjs-util'

import WithEmptyState from 'Elements/WithEmptyState'

import Styles from './BlockExplorer.css'

class EmptyTransactions extends Component {
  render () {
    return (
      <div className={Styles.EmptyTransactions}>
        <p>No transactions have occured.</p>
      </div>
    )
  }
}

export default class BlockExplorer extends Component {
  _renderRecentTransaction = (transactions) => {
    if (transactions.length === 0) {
      return 'NO TRANSACTIONS'
    }

    return transactions.map((tx) => {
      return EtherUtil.bufferToHex(tx.hash)
    })
  }

  render () {
    let { transactions } = this.props.testRpcState

    return (
      <div className={Styles.BlockExplorer}>
        <div className={Styles.Blocks}>
          <h4>LAST 5 BLOCKS</h4>
          <header>
            <input
              type={'text'}
              className={Styles.BlockSearchInput}
              placeholder={'Search for Block Number'}
            />
          </header>
          <main>
            <ul className={Styles.BlockList}>
              {
                this.props.testRpcState.blocks.map((block) => {
                  return (
                    <li className={Styles.Block} key={EtherUtil.bufferToHex(block.hash)}>
                      <span className={Styles.BlockNumber}>
                        <p>Block Number</p>
                        {EtherUtil.bufferToInt(block.header.number)}
                      </span>
                      <table className={Styles.BlockData}>
                        <tr>
                          <td>
                            <dl>
                              <dt>Block Hash</dt>
                              <dd>{EtherUtil.bufferToHex(block.hash)}</dd>
                            </dl>
                            <dl>
                              <dt>Transactions ({block.transactions.length})</dt>
                              <dd>{
                                this._renderRecentTransaction(block.transactions)
                              }</dd>
                            </dl>
                            <dl>
                              <dt>Bloom</dt>
                              <dd className={Styles.Bloom}>{EtherUtil.bufferToHex(block.header.bloom)}</dd>
                            </dl>
                          </td>
                          <td>
                            <dl>
                              <dt>Parent Hash</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.parentHash)}</dd>
                            </dl>
                            <dl>
                              <dt>Gas Used / Gas Limit</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.gasUsed)} / {EtherUtil.bufferToHex(block.header.gasLimit)}</dd>
                            </dl>
                            <dl>
                              <dt>Nonce</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.nonce)}</dd>
                            </dl>
                            <dl>
                              <dt>Mined On</dt>
                              <dd><Moment unix>{EtherUtil.bufferToInt(block.header.timestamp)}</Moment></dd>
                            </dl>
                            <dl>
                              <dt>Mix Hash</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.mixHash)}</dd>
                            </dl>
                            <dl>
                              <dt>Receipts Root</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.receiptTrie)}</dd>
                            </dl>
                            <dl>
                              <dt>State Root</dt>
                              <dd>{EtherUtil.bufferToHex(block.header.stateRoot)}</dd>
                            </dl>
                            <dl>
                              <dt>Extra Data</dt>
                              <dd><pre>{EtherUtil.bufferToHex(block.header.extraData)}</pre></dd>
                            </dl>
                          </td>
                        </tr>
                      </table>
                    </li>
                  )
                })
              }
            </ul>
          </main>
          <footer>
          </footer>
        </div>
        <div className={Styles.Transactions}>
          <h4>LAST 5 TRANSACTIONS</h4>
          <header>
            <input
              type={'text'}
              className={Styles.TxSearchInput}
              placeholder={'Search for TX Hash'}
            />
          </header>
          <main>
            <WithEmptyState
              test={transactions.length === 0}
              emptyStateComponent={EmptyTransactions}
            >
              <ul className={Styles.TransactionList}>
                {
                  transactions.map((tx) => {
                    console.log(tx)
                    return (
                      <li className={Styles.Transaction} key={tx.hash}>
                        <table className={Styles.TransactionData}>
                          <tr>
                            <td>
                              <dl>
                                <dt>Transaction Hash</dt>
                                <dd>{EtherUtil.bufferToHex(tx.hash)}</dd>
                              </dl>
                            </td>
                            <td>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <dl>
                                <dt>From</dt>
                                <dd>{EtherUtil.bufferToHex(tx.from)}</dd>
                              </dl>
                            </td>
                            <td>
                              <dl>
                                <dt>To</dt>
                                <dd>{EtherUtil.bufferToHex(tx.to)}</dd>
                              </dl>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <dl>
                                <dt>Nonce</dt>
                                <dd>{EtherUtil.bufferToHex(tx.nonce)}</dd>
                              </dl>
                            </td>
                            <td>
                              <dl>
                                <dt>Value</dt>
                                <dd>{EtherUtil.bufferToHex(tx.value)}</dd>
                              </dl>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <dl>
                                <dt>Init</dt>
                                <dd>{EtherUtil.bufferToHex(tx.init)}</dd>
                              </dl>
                            </td>
                            <td>
                              <dl>
                                <dt>Value</dt>
                                <dd>{EtherUtil.bufferToHex(tx.value)}</dd>
                              </dl>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <dl>
                                <dt>Gas Price</dt>
                                <dd>{EtherUtil.bufferToHex(tx.gasPrice)}</dd>
                              </dl>
                              <dl>
                                <dt>Data</dt>
                                <dd className={Styles.TxData}>{EtherUtil.bufferToHex(tx.data)}</dd>
                              </dl>
                            </td>
                            <td>
                              <dl>
                                <dt>Gas Limit</dt>
                                <dd>{EtherUtil.bufferToHex(tx.gasLimit)}</dd>
                              </dl>
                              <dl>
                                <dt>V</dt>
                                <dd>{EtherUtil.bufferToHex(tx.v)}</dd>
                              </dl>
                              <dl>
                                <dt>R</dt>
                                <dd>{EtherUtil.bufferToHex(tx.r)}</dd>
                              </dl>
                              <dl>
                                <dt>S</dt>
                                <dd>{EtherUtil.bufferToHex(tx.s)}</dd>
                              </dl>
                            </td>
                          </tr>
                        </table>
                      </li>
                    )
                  })
                }
              </ul>
            </WithEmptyState>
          </main>
          <footer>
          </footer>
        </div>
      </div>
    )
  }
}
