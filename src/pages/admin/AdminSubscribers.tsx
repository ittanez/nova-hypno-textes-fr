
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Download, Trash2, Mail, CheckCircle, XCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  confirmed: boolean;
  lastEmailSentAt: string | null;
}

const AdminSubscribers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchSubscribers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockSubscribers: Subscriber[] = Array.from({ length: 25 }, (_, i) => ({
          id: `subscriber-${i + 1}`,
          email: `subscriber${i + 1}@example.com`,
          subscribedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
          confirmed: Math.random() > 0.2, // 80% confirmed
          lastEmailSentAt: Math.random() > 0.5 
            ? new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toISOString() 
            : null
        }));
        
        setSubscribers(mockSubscribers);
        setFilteredSubscribers(mockSubscribers);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger la liste des abonnés',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubscribers();
  }, [toast]);

  useEffect(() => {
    // Filter subscribers when search query changes
    if (searchQuery.trim() === '') {
      setFilteredSubscribers(subscribers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = subscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(query)
      );
      setFilteredSubscribers(filtered);
    }
    // Reset to first page when filtering
    setCurrentPage(1);
  }, [searchQuery, subscribers]);

  const handleDeleteSubscriber = (id: string) => {
    // In a real app, this would be an API call
    setSubscribers(subscribers.filter(sub => sub.id !== id));
    setFilteredSubscribers(filteredSubscribers.filter(sub => sub.id !== id));
    
    toast({
      title: 'Abonné supprimé',
      description: "L'abonné a été supprimé avec succès",
    });
  };

  const exportCsv = () => {
    // Create CSV content
    const headers = ['Email', 'Date d\'inscription', 'Confirmé', 'Dernier email'];
    const csvContent = [
      headers.join(','),
      ...filteredSubscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleDateString('fr-FR'),
        sub.confirmed ? 'Oui' : 'Non',
        sub.lastEmailSentAt 
          ? new Date(sub.lastEmailSentAt).toLocaleDateString('fr-FR') 
          : 'Aucun'
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `abonnes-blog-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Export réussi',
      description: 'La liste des abonnés a été exportée au format CSV',
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Pagination logic
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  return (
    <>
      <Helmet>
        <title>Gestion des abonnés | NovaHypnose Blog Admin</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin-blog/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-3xl font-serif font-bold">
              Gestion des abonnés
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            onClick={exportCsv} 
            disabled={filteredSubscribers.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter en CSV
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle>Liste des abonnés</CardTitle>
                <CardDescription>
                  {filteredSubscribers.length} abonnés au total
                </CardDescription>
              </div>
              <div className="w-full md:w-64">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par email..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-muted-foreground">Chargement des abonnés...</p>
              </div>
            ) : filteredSubscribers.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Dernier email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>{formatDate(subscriber.subscribedAt)}</TableCell>
                          <TableCell>
                            <Badge variant={subscriber.confirmed ? "default" : "outline"}>
                              {subscriber.confirmed ? (
                                <div className="flex items-center">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Confirmé
                                </div>
                              ) : (
                                <div className="flex items-center text-muted-foreground">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  En attente
                                </div>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {subscriber.lastEmailSentAt 
                              ? formatDate(subscriber.lastEmailSentAt)
                              : "Aucun email envoyé"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                disabled={!subscriber.confirmed}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer cet abonné ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }} 
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Aucun abonné trouvé</h3>
                {searchQuery ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aucun résultat ne correspond à votre recherche. Essayez avec d'autres termes.
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Vous n'avez pas encore d'abonnés à votre blog.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminSubscribers;
