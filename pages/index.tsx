import type { NextPage } from 'next'
import Head from 'next/head'
import s from '../styles/Home.module.css'
import PriorityTable from '../components/priority-table'

const Home: NextPage = () => {
  return (
    <div className={s.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={s.main}>
        <PriorityTable />
        <UsageInfo />
      </main>
    </div>
  )
}

export default Home

function UsageInfo() {
  return <div className={s.usageInfo}>
        <p>
          <a href="https://github.io/cronon/priority-table">https://github.io/cronon/priority-table</a>
        </p>
        <p>
        The main purpose is to sort items manually with bubble-sort by various aspects.
        </p>
        <p>
        Copy a list of tickets or other items, put cursor to the New row input, press Ctrl+V.
        You'll see the list of your items each item in a separate row.
        Now you can add columns that will represent various aspects of your items.
        The currently sorting column is marked with blue outline over its heading.
        Sort rows with +/- buttons or by draggin a row by its # button.
        When you finish sorting by one aspect, click on another aspect.
        The rows will appear sorted according to it. Now you can your rows according to it.
        </p>
        <p>
        When you finish, you can select everything by mouse and copy and paste it to Excel.
        </p>
  </div>
}