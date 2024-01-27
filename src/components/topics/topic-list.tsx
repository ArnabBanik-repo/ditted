import { Chip } from '@nextui-org/react';
import paths from '@/paths';
import db from '@/db';
import Link from 'next/link';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map(topic =>
    <Link href={paths.topicShow(topic.slug)} key={topic.id}>
      <Chip color='warning' variant='shadow'>{topic.slug}</Chip>
    </Link>
  )

  return <div className='flex flex-row flex-wrap gap-2'>{renderedTopics}</div>;
}

