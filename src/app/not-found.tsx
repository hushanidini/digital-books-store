import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="max-w-lg w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <FileQuestion className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
                    <CardTitle className="text-2xl">Page Not Found</CardTitle>
                    <CardDescription className="text-base mt-2">
                        {`The page you're looking for doesn't exist or has been moved.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                        <p className="text-sm font-medium">You might want to:</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Check the URL for typos</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{`Return to the homepage and browse our catalog`}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{`Use the search feature to find what you're looking for`}</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button asChild className="w-full sm:w-auto" size="lg">
                        <Link href="/">
                            <Home className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full sm:w-auto" size="lg">
                        <Link href="/#search">
                            <Search className="h-4 w-4 mr-2" />
                            Search Books
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}