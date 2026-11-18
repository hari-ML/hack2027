import { Hack2027App } from './components/Hack2027App'
import { getAllCommitteeMembers, type CommitteeMember } from '@/lib/committee-store'

export type CommitteeMemberData = CommitteeMember

export default async function HomePage() {
  const committeeMembers = await getAllCommitteeMembers()
  return <Hack2027App committeeMembers={committeeMembers} />
}
