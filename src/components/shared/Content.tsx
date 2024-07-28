'use client';
import { FC, useState } from "react";
import { Container } from "./Container";
import { Card } from "../ui/card";
import { IUser } from "@/types/Users.interface";
import axios from "axios";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from "../ui/skeleton";

interface Props {}

const getUsers = async () => {
	const { data } = await axios.get<IUser[]>('http://localhost:3000/api/users');
	return data;
};

export const Content: FC<Props> = () => {
	const [fullName, setFullName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const queryClient = useQueryClient();

	const { isLoading, data } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers
	});

	const deleteUserMutation = useMutation({
		mutationKey: ['deleteUsers'],
		mutationFn: async (id: number | string) => {
			await axios.delete(`http://localhost:3000/api/users/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users']
			})
		}
	});

	const submitUser = async () => {
		if (fullName && email && password) {
			try {
				await axios.post('http://localhost:3000/api/users', {
					fullName,
					email,
					password
				});
				setFullName('');
				setEmail('');
				setPassword('');
				queryClient.invalidateQueries({
					queryKey: ['users']
				});
			} catch (error) {
				console.error("Error submitting user:", error);
			}
		}
	};

	return (
		<Container>
			<div className="h-full w-full flex flex-col mt-4">
				{isLoading ? 
					<div style={{ width: "780px" }} className="flex gap-2 flex-wrap">
						<Skeleton className="h-[50px] w-[100px]"/>
						<Skeleton className="h-[50px] w-[120px]"/>
						<Skeleton className="h-[50px] w-[150px]"/>
						<Skeleton className="h-[50px] w-[200px]"/>
						<Skeleton className="h-[50px] w-[170px]"/>
						<Skeleton className="h-[50px] w-[200px]"/>
						<Skeleton className="h-[50px] w-[200px]"/>
						<Skeleton className="h-[50px] w-[100px]"/>
						<Skeleton className="h-[50px] w-[135px]"/>
						<Skeleton className="h-[50px] w-[100px]"/>
					</div>
				: (
					<>
						{data?.length ? (
							<div style={{ width: "780px" }} className="flex gap-2 flex-wrap">
								{data.map((user) => (
									<Card key={user.id} className="p-2">
										<div className="flex gap-1 items-center">
											<p>{user.fullName} - {user.email}</p>
											<Trash2 size={20} className="cursor-pointer" onClick={() => deleteUserMutation.mutate(user.id)} />
										</div>
									</Card>
								))}
							</div>
						) : (
							'No users found'
						)}
					</>
				)}

				<div className="flex flex-col mt-5 gap-2 justify-center items-center">
					<Input 
						type="text" 
						placeholder="name" 
						value={fullName} 
						className="w-60"
						onChange={e => setFullName(e.target.value)} 
					/>
					<Input 
						type="text" 
						placeholder="email" 
						value={email} 
						className="w-60"
						onChange={e => setEmail(e.target.value)} 
					/>
					<Input 
						type="password" 
						placeholder="password" 
						value={password} 
						className="w-60"
						onChange={e => setPassword(e.target.value)} 
					/>
					<Button onClick={submitUser} className="w-60">Сохранить</Button>
				</div>
			</div>
		</Container>
	);
};
