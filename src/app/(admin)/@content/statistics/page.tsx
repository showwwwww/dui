'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Statistics() {
  React.useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch('/api/containers/');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };
    fetchContainers();
  }, []);

  return (
    <div className="flex justify-start align-middle p-4 gap-4 w-full h-full">
      <Card className="w-62 h-48">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Statistics Page</p>
        </CardContent>
        <CardFooter>
          <Button>Footer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
